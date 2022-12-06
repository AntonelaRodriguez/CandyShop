const { User } = require("../db.js");

async function get_users(req, res, next) {
  const { name } = req.query;
  try {
    if (name) {
      let users = await User.findAll({ where: { name: name } });
      if (!users.length) {
        return res.status(404).json({ msg: `No matches for ${name}` });
      }
      return res.status(200).json(users);
    }
    let users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  get_users,
};
