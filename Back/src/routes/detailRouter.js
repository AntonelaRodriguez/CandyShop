const { Router } = require("express");
const detailRouter = Router();
const { postDetailCart,getDetailCart } = require('../controllers/detail');
const { Detail } = require('../db.js');

detailRouter.post("/", async (req, res, next) => {
    try{
        const {cart} = req.body;
        const newDetailCart = await postDetailCart(cart);
        res.status(201).json(newDetailCart);
    }catch(error){
        next(error);
    }
});

detailRouter.get("/:CartOrderN", async (req, res, next) => {
    try{
        const {CartOrderN} = req.params;
        const detailCart = await getDetailCart(CartOrderN);
        res.status(201).json(detailCart);
    }catch(error){
        next(error);
    }
});

module.exports = detailRouter;