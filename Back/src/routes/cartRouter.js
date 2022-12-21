const { Router } = require("express");
const cartRouter = Router();
const { postCart, getCart, getAllCarts, updateCart } = require('../controllers/cart');
const { Cart } = require('../db.js');

cartRouter.post("/", async (req, res, next) => {
    try{
        const {email,totalPrice} = req.body;
        const newCart = await postCart(email,totalPrice);
        res.status(201).json(newCart);
    }catch(error){
        next(error);
    }
});

cartRouter.get("/:email", async (req, res, next) => {
    try {
        const {email} = req.params;
        const cart = await getCart(email);
        res.status(201).json(cart);
    }catch(error){
        next(error);
    }
});

cartRouter.get("/", async (req, res, next) => {
    try {
        const carts = await getAllCarts();
        res.status(201).json(carts);
    }catch(error){
        next(error);
    }
});

cartRouter.put("/", async (req, res, next) => {
    try {
        const {orderN, state,totalPrice,date} = req.body;
        const updatedCart = await updateCart(orderN,state,totalPrice,date);
        res.status(201).send("Cart succesfully updated!");
    }catch(error){
        next(error);
    }
});


module.exports = cartRouter;