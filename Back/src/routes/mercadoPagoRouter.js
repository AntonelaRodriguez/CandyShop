const server = require("express").Router();
const { Cart, User, Product, Detail } = require("../db.js");
const { REACT_APP_BACK_URL, REACT_APP_FRONT_URL } = process.env;
const { postDetailCart } = require("../controllers/detail");
const { searchById, updateProduct } = require("../controllers/product");

const mercadopago = require("mercadopago");
mercadopago.configure({ access_token: process.env.ACCESS_TOKEN });

server.post("/", async (req, res, next) => {
  let back_url = `${REACT_APP_BACK_URL}/mercadopago/pagos`;
  try {
    const { cartId, userId, cartItems } = req.body;
    let items = cartItems.map((i) => ({
      title: i.name,
      unit_price: Number(i.price),
      quantity: Number(i.quantity) || 1,
      id: i.id,
    }));
    let preference = {
      items,
      external_reference: `${cartId}-${userId}`,
      payment_methods: {
        excluded_payment_types: [{ id: "atm" }],
        installments: 3,
      },
      back_urls: { success: back_url, failure: back_url, pending: back_url },
      // auto_return: 'approved',
      shipments: {
        receiver_address: {
          zip_code: "",
          street_name: "",
          street_number: 11,
          floor: "",
          apartment: "",
        },
      },
      // no anda esto porque deberia saer un sitio seguro(deploy)
      // notification_url: `${REACT_APP_BACK_URL}/mercadopago/pagos`
    };
    const mercadoResponse = await mercadopago.preferences.create(preference);
    return res.json({ id: mercadoResponse.body.id });
  } catch (error) {
    next(error);
  }
});

server.get("/pagos", async (req, res, next) => {
  let reference = req.query.external_reference.split("-");
  let external_reference = req.query.external_reference.toString();
  let cartId = Number(reference[0]);
  try {
    let cart = await Cart.findByPk(cartId);
    setTimeout(async () => {
      let updateState = "cancelled";
      let factura = await comprobante(external_reference);
      console.log("factura", factura)
      let carrito = factura.cart?.map((el) => {
        return {
          quantity: Number(el.quantity),
          price: Number(el.unit_price) * Number(el.quantity),
          CartOrderN: Number(cartId),
          ProductId: Number(el.id),
        };
      });
      if (factura.status === "approved") {
        updateState = "completed";
        for (let i = 0; i < carrito.length; i++) {
          let product = await Product.findByPk(Number(carrito[i].ProductId));
          product.stock = product.stock - Number(carrito[i].quantity);
          if (product.stock === 0) {
            product.availability = false;
          }
          await product.save();
          await Detail.create({
            quantity: Number(carrito[i].quantity),
            price: Number(carrito[i].price) * Number(carrito[i].quantity),
            CartOrderN: Number(cartId),
            ProductId: Number(carrito[i].ProductId),
          });
        }
      }
      // if (factura.status === "rejected") updateState = "cancelled";
      if (factura.status === "in_process") updateState = "processing";
      await cart.update(
        {
          state: updateState,
          totalPrice: (factura.status === "approved" || factura.status === "processing") ? factura.totalUltimaCompra : 0,
        },
        { where: { orderN: cartId } }
      );
      return res.redirect(`https://candy-shop-nqa0tdnru-antonelarodriguez.vercel.app`);
    },[2000])
  } catch (error) {
    next(error);
  }
});

const comprobante = async (id) => {
  const mp = new mercadopago(process.env.ACCESS_TOKEN);
  try {
    let {
      body: { results },
    } = await mp.get(`/v1/payments/search`, { external_reference: id });
    let totalUltimaCompra = results[results.length - 1].transaction_details.total_paid_amount;
    let cart = results[results.length - 1].additional_info.items;
    let status = results[results.length - 1].status;
    return { totalUltimaCompra, cart, status };
  } catch (error) {
    return { totalUltimaCompra: 0, cart: [], status: "rejected" };
  }
};

module.exports = server;
