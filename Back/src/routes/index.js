const { Router } = require("express");
const userRouter = require("./userRouter.js");
const productRouter = require('./productRouter.js');

const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

module.exports = router;
