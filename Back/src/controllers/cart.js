const { Cart } = require('../db.js')

const postCart = async (email, orderN, totalPrice) => {
    if(!email) throw new Error({message:"Email is required", status:400});

    let order = {
        UserEmail: email,
        orderN: orderN,
        totalPrice: totalPrice
    }
    let newOrder = await Cart.create(order);
    return newOrder;
}

const getCart = async (email) => {
    if(!email) throw new Error({message:"Email is required", status:400});

    let order = await Cart.findAll({
        where: {
            UserEmail: email
        }
    });
    return order;
}

const getAllCarts = async () => {
    let allOrders = await Cart.findAll();
    return allOrders;
}

const updateCart = async (orderN, state) => {
    await Cart.update({ state: state }, {
        where: {
            orderN: orderN
        }
    })
}

module.exports = {
	postCart,
    getCart,
    getAllCarts,
    updateCart
};