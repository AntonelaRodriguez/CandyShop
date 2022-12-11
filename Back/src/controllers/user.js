const { User } = require("../db.js");

const getAllUsers = async (name) => {
    if (name) {
      let users = await User.findAll({ where: { name: name } });
      if (!users.length) {
       throw new Error({msg: `No matches for ${name}`});
      }
      return users;
    }
    let users = await User.findAll();
    if(!users.length) throw new Error({msg : 'No users wre created yet!'})
    return users
}

module.exports = {
  getAllUsers,
};
