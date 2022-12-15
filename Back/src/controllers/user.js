const { User } = require("../db.js");

const getAllUsers = async (name) => {
    if (name) {
      let users = await User.findAll({ where: { name: name } });
      if (!users.length) {
       throw new Error(`No matches for ${name}`);
      }
      return users;
    }
    let allUsers = await User.findAll();
    console.log(allUsers);
    if(!allUsers.length) throw Error({message : 'No users wre created yet!'})
    return allUsers
}

const createUser = async (name, lastName, dni, phoneNumber, address, email, password, image, birthdate, admin) => {
 
      const userExists = await User.findAll({where: {dni: dni}});
      if (userExists.length)  throw new Error ("This User already exists");

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

module.exports = {
  getAllUsers,
  createUser,
};
