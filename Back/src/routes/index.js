const { Router } = require("express");
const userRouter = require("./user.js");

const router = Router();
router.use("/users", userRouter);

module.exports = router;
