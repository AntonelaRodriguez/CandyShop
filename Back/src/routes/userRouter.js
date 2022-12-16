const { Router } = require("express");
const { getAllUsers, createUserDetail, postUser,getUser } = require("../controllers/user");
const userRouter = Router();


// AGREGAR A LA RUTA DEL ADMINISTRADOR
// userRouter.get("/", async (req, res, next) => {
// 	const { name } = req.query;
//   try {
//     const users = await getAllUsers(name)
// 	  res.status(200).json(users)
//   } catch (error) {
//     next(error);
//   }
// });


userRouter.get("/:email", async (req, res, next)=>{
  const {email} = req.params;
  try{
    const user = await getUser(email);
    res.status(200).json(user);
  }catch(error){
    next(error);
  }
});


userRouter.post("/", async (req, res, next)=>{
  const data = req.body;
  try{
  if(!data.email) res.status(400).json("Email is required");
    const newUser = await postUser(data.email, data.admin);
    res.status(200).json(newUser);
  }catch(error){
    next(error);
  }
})

userRouter.post("/userDetail", async (req, res, next) => {
  const {email,name,lastName, phoneNumber, address, image, companyName} = req.body;
  try {
    const user = await createUserDetail(email,name, lastName, phoneNumber, address, image,companyName);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});




module.exports = userRouter;
