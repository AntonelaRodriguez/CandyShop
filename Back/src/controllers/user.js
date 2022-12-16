const { User, UserDetail } = require("../db.js");





const postUser = async (email, admin) =>{

    const result = await User.findOrCreate({
      where: {
        email: email},
      defaults:{
        email: email,
        admin: admin
      }
    });

    return result;

}

const getUser = async (email)=>{
  const user = await User.findByPk(email, {
    include: [{model: UserDetail}]
  })
  if(!user) throw new Error("User not found");
  return user;
}


// const getAllUsers = async (name) => {
//     if (name) {
//       let users = await User.findAll({ where: { name: name } });
//       if (!users.length) {
//        throw new Error(`No matches for ${name}`);
//       }
//       return users;
//     }
//     let allUsers = await User.findAll();
//     console.log(allUsers);
//     if(!allUsers.length) throw Error({message : 'No users wre created yet!'})
//     return allUsers
// }

const createUserDetail = async (email,name, lastName, phoneNumber, address, image, companyName) => {
 
    if(!email || !name || !lastName || !phoneNumber || !address || !image || !companyName) throw new Error("All arguments are require");
    
    const newUser = await UserDetail.findOrCreate({where:{
      UserEmail: email},
      defaults: {
        name,
        lastName,
        phoneNumber,
        address,
        image,
        companyName
      }
    })
        return newUser;     
}



module.exports = {
  // getAllUsers,
  createUserDetail,
  postUser,
  getUser
};
