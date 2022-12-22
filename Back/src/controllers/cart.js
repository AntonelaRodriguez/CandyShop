const { Cart } = require('../db.js')

const postCart = async (email, totalPrice) => {
    if(!email) throw new Error({message:"Email is required", status:400});

    let order = {
        UserEmail: email,
        totalPrice: totalPrice
    }
    let newOrder = await Cart.create(order);
    return newOrder;
}

const getCart = async (email) => {
    if(!email) throw new Error({message:"Email is required", status:400});

    let order = await Cart.findAll({
        where: {
            UserEmail: email
        }
    });
    return order;
}

const getAllCarts = async () => {
    let allOrders = await Cart.findAll();
    return allOrders;
}

const updateCart = async (orderN, state, totalPrice, date) => {
    await Cart.update({ 
        state: state,
        totalPrice: totalPrice,
        date: date
    }, {
        where: {
            orderN: orderN
        }
    })
}

module.exports = {
	postCart,
    getCart,
    getAllCarts,
    updateCart
};