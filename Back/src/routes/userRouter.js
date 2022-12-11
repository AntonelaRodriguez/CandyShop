const { Router } = require("express");
const { getAllUsers } = require("../controllers/user");
const userRouter = Router();
const { User } = require("../db.js");


userRouter.get("/", async (req, res, next) => {
	const { name } = req.query;
  try {
    const users = getAllUsers(name)
	return res.status(200).json(users)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
