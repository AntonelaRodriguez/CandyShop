const { User, UserDetail, Cart } = require("../db.js");

const postUser = async (email, admin) => {
  const [result, created] = await User.findOrCreate({
    where: {
      email: email,
    },
    defaults: {
      email: email,
      admin: admin,
    },
  });
  if (created && !admin) {
    await Cart.create({ UserEmail: email, totalPrice: 0 });
  }
  return result;
};

const getUser = async (email) => {
  const user = await User.findByPk(email, {
    include: [{ model: UserDetail }],
  });
  if (!user) throw new Error("User not found");
  return user;
};

//-------Admin User
const getAllUsers = async () => {
  let allUsers = await User.findAll({
    include: [{ model: UserDetail }],
  });
  if (!allUsers.length) throw Error("No users");
  return allUsers;
};

const updateUser = async (email, banned, admin, subscribed) => {
  // if (!email || !banned || !admin) throw new Error("All arguments are require");

  if(email === 'pepo@gmail.com') throw new Error(`This user's privileges can not be udpdated.`)

  await User.update(
    {
      banned,
      admin,
      subscribed
    },
    {
      where: {
        email: email,
      },
    }
  );
};

const deleteUser = async (email) => {
  if (!email) throw new Error("All arguments are require");
  await User.destroy({ where: { email: email } });
};

//-----------Normal User
const createUserDetail = async (body) => {
  let { 
    email,
    name,
    lastName,
    phoneNumber,
    address,
    image,
    companyName 
  } = body
  if (
    !email ||
    !name ||
    !lastName ||
    !phoneNumber ||
    !address ||
    !image ||
    !companyName
  )
    throw new Error("All arguments are require");

  const newUser = await UserDetail.findOrCreate({
    where: {
      UserEmail: email,
    },
    defaults: {
      email,
      name,
      lastName,
      phoneNumber,
      address,
      image,
      companyName,
    },
  });
  return newUser;
};

const updateUserDetail = async (body) => {
  let {
    email,
    name,
    lastName,
    phoneNumber,
    address,
    image,
    companyName
  } = body;

  await UserDetail.update(
    {
      name,
      lastName,
      phoneNumber,
      address,
      image,
      companyName,
    },
    {
      where: {
        UserEmail: email,
      },
    }
  );
};

module.exports = {
  getAllUsers,
  createUserDetail,
  postUser,
  getUser,
  updateUserDetail,
  updateUser,
  deleteUser,
};
