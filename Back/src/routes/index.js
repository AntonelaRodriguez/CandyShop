const { Router } = require("express");
const userRouter = require("./userRouter.js");
const productRouter = require('./productRouter.js');
const prodPicRouter = require('./prodPic.js');

const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/pic", prodPicRouter);

module.exports = router;
