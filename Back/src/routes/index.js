const { Router } = require("express");
const userRouter = require("./userRouter.js");
const productRouter = require('./productRouter.js');
const categoryRouter = require('./categoryRouter')
const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter)

module.exports = router;
