const { User } = require("../db.js");

const getAllUsers = async (email) => {
    if (email) {
      let users = await User.findAll({ where: { email: email } });
      if (!users.length) {
       throw new Error({msg: `No matches for ${email}`});
      }
      return users;
    }
    let users = await User.findAll();
    if(!users.length) throw new Error({msg : 'No users wre created yet!'})
    return users
}

const createUser = async ({name, lastName, dni, phoneNumber, address, email, password, image, birthdate, admin}) => {
  if (dni) {
    const userExists = await User.findAll({where: {dni: dni}});
    if (userExists) throw new Error ({msg: "this User already exists"});
    const newUser = await User.create({
      name, 
      lastName, 
      dni, 
      phoneNumber, 
      address, 
      email, 
      password, 
      image, 
      birthdate, 
      admin
    })
    return newUser;
  }
}

module.exports = {
  getAllUsers,
  createUser,
};
