const { Router } = require("express");
const { getAllUsers, createUserDetail, postUser,getUser, updateUserDetail, updateUser, deleteUser } = require("../controllers/user");
const userRouter = Router();

userRouter.get("/:email", async (req, res, next)=>{
  const {email} = req.params;
  try{
    const user = await getUser(email);
    res.status(200).json(user);
  }catch(error){
    next(error);
  }
});


//------Normal User / Admin User
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

//------Admin User
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers()
	  res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/admin/updateUser/:email", async (req, res,next) => {
  const {email} = req.params;
  const {banned,admin} = req.body;
  try{
    if(!email) res.status(400).json("Email is required");
    const newUser = await updateUser(email, banned, admin)
    return res.status(200).send("Done");
  } catch(error) {
    next(error);
  }
})

userRouter.delete("/admin/deleteUser/:email", async(req, res, next) => {
  const {email} = req.params;
  try{
    await deleteUser(email);
    res.status(200).send("User deleted");
  } catch(error) {
    next(error);
  }
})

//---------Normal user
userRouter.post("/userDetail", async (req, res, next) => {
  const {email,name,lastName, phoneNumber, address, image, companyName} = req.body;
  try {
    const user = await createUserDetail(email,name, lastName, phoneNumber, address, image,companyName);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.put("/userDetail", async (req, res, next) => {
  const {email,name,lastName, phoneNumber, address, image, companyName} = req.body;
  try {
    const user = await updateUserDetail(email,name, lastName, phoneNumber, address, image,companyName);
    return res.status(200).send("Done");
  } catch (error) {
    next(error);
  }
})



module.exports = userRouter;
