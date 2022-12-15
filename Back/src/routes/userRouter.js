const { Router } = require("express");
const { getAllUsers, createUser } = require("../controllers/user");
const userRouter = Router();



userRouter.get("/", async (req, res, next) => {
	const { name } = req.query;
  try {
    const users = await getAllUsers(name)
	return res.status(200).json(users)
  } catch (error) {
    next(error);
  }
});

userRouter.post("/", async (req, res, next) => {
  const {name, lastName, dni, phoneNumber, address, email, password, image, birthdate, admin} = req.body;
  try {
    const newUser = await createUser(name, lastName, dni, phoneNumber, address, email, password, image, birthdate, admin)
    return res.status(200).json(newUser)
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
