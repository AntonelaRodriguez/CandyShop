const { Detail, Product } = require('../db.js');

const postDetailCart = async(cart) => {
    if(!cart.length === 0) throw new Error({message:"Empty Cart", status:400});
    cart.forEach(async(e)=>{
        await Detail.create(e);
    });
};

const getDetailCart = async (CartOrderN) => {
    if(!CartOrderN)throw new Error({message:"CartOrderN is required", status:400});
    let detailCart = await Detail.findAll({
        where:{
            CartOrderN: CartOrderN,
        },
        include: [{
            model: Product
        }]
    });
    return detailCart;
}

const getAllUserOrders = async (email) => {
    if(!email) throw new Error('Email parameter is missing')
    const allUserOrders = await Detail.findAll({
        where: {
            UserEmail: email
        },
        include: [{
            model: Product
        }]
    })
    return allUserOrders;
}

module.exports = {
	postDetailCart,
    getDetailCart,
    getAllUserOrders
};