const { Detail } = require('../db.js');

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

module.exports = {
	postDetailCart,
    getDetailCart
};