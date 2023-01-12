const { Op } = require("sequelize");
const { Product, Category, Cart, Detail } = require('../db.js')
const loadProductsAndCategories = require("../../loadDB.js");

const searchCandy = async (name) => {    //busca products por matcheo parcial
	let product = []
	// if(name !== "" && typeof name === "string"){
	// if(!name) throw new Error({message:"Value is undefined", status:400});
	// }
	let nameTrimed = name.replace(/^\s+|\s+$/, "");
	if(!nameTrimed.length) return [];
	let products = await Product.findAll({
      where: { name: { [Op.iLike]: "%"+nameTrimed+"%" } },
      include: [
        { model: Category },
      ]
    });
	// if(!products.length) throw new Error({message: `No matches for ${nameTrimed}`, status: 404});

	product = products.map((el)=>valuesToReturn(el.toJSON()));


	return product;
};

const searchById = async (id) => {    //busca products por id 
	let product = await Product.findByPk(id, {
		include: [
		  { model: Category },
		]
	  });
	  if(!product) throw new Error({ msg: `No matches for id: ${id}`})
	  return valuesToReturn(product);

};

const updateProduct = async (body, id) => {   //actualiza data de un producto existente
	let updateds = await Product.update(
		{ ...body },
		{ where: { id: id } }
	  );
	return updateds
};

const deleteProduct = async (id) => {    //elimina un producto 
    let deleted = await Product.destroy({ where: { id: id } });
	return deleted
};

const getAllProducts = async () => {    //busca todos los products de la db
	// const allProducts = await Product.findAll({ include: [
	// 	{ model: Category },
	// ]})
     
	// return allProducts.map((el)=>valuesToReturn(el.toJSON()));
	try {
    let allProducts = await Product.findAll({
      include: { model: Category },
    });
    !allProducts.length && (allProducts = await loadProductsAndCategories());
    return allProducts.map((el) => valuesToReturn(el.toJSON()));
  } catch (error) {
    throw new Error(error.message);
  }
};


const createProduct = async (name,description,price,brand,image,stock,tacc,category)=>{
    try{
        if(!name||!description||!price || !brand || !stock) throw new Error("One of the arguments is not defined");
        
        if(tacc === null || tacc === undefined) throw new Error("Tacc is required");

        if(isNaN(price) || isNaN(stock)) throw new Error("Argument is not a number");
    
        let newName = name.toLowerCase();
    
        const result = await Product.findOne({where:{ name: newName }});
        if(result) throw new Error("The product already exists");
        
        const newProduct = await Product.create({
            name,
            description,
            price,
            availability: stock > 0 ? true : false,
            image,
            stock,
            brand,
            tacc
        });     

		   let categoryProduct = await Category.findAll({
             where:{
                name: category
             }
         });
        newProduct.addCategory(categoryProduct);

       return newProduct;
    }catch(error){
        throw new Error(error.message);
    }
};

const filteringProducts = async (querys) => {
	let { tacc, brand, category:categ } = querys;
	let products = await Product.findAll({
	  include: [{ model: Category }],
	});
	products = products.map((el) => valuesToReturn(el.toJSON()));
	if(tacc !== 'TACC' ) {
		  tacc == 'notacc' && (products = products.filter((p) => p.tacc === false))
		  tacc == 'tacc' && (products = products.filter((p) => p.tacc === true))
	  }
	brand !== 'BRAND' && (products = products.filter((p) => p.brand == brand));
	categ !== 'CATEGORY' && (products = products.filter((p) => p.category.includes(categ)));
	return products;
  };

const IdspurchasedProducts = async (email) => {
	try {
		let products = await Cart.findAll({ 
			where: { 
				state: ["completed", "delivered", "recived"],
				UserEmail: email
			},
			include: [{ model: Detail }],
		})
		let ProductIds = products.map((p) => p.Detail.ProductId).filter((p) => p !== null)
		ProductIds = Array.from(new Set(ProductIds));
		return ProductIds;

	} catch (error) {
		return error.message
	}
}

const valuesToReturn = (value) =>{	
	return {
		id:value.id,
		name: value.name,
		description: value.description,
		price: value.price,
		availability: value.availability,
		image: value.image,
		stock: value.stock,
		brand: value.brand,
		tacc: value.tacc,
		quantity: 1,
		category: value.Categories.map(el=>el.name),
	}
}


module.exports = {
	getAllProducts,
	searchById,
	searchCandy,
	updateProduct,
	deleteProduct,
	createProduct,
	filteringProducts,
	IdspurchasedProducts
};


/*

{
	"name": "Caramelo billiken", 
	"description": "Es bastante malo la verdad", 
	"price": 33.2, 
	"availability": true, 
	"image": "Unaimagen.jpg", 
	"stock": 32, 
	"brand": "billiken", 
	"tacc": true
}


79314037-1584-495b-86a5-bb2a5eb45bf6
c63c92d5-c0fc-467d-b765-432d4f4bce35
*/