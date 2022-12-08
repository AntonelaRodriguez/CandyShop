const { Router } = require("express");
const { Op } = require("sequelize");
const { Product, ProdPic, Category } = require('../db.js')

const searchCandy = async (name) => {    //busca products por matcheo parcial
	if(!name) throw new Error({message:"Value is undefined", status:400});
	let nameTrimed = name.replace(/^\s+|\s+$/, "");
	if(!nameTrimed.length) throw new Error({message: "Value is empty string!", status:400});
	let products = await Product.findAll({
      where: { name: { [Op.iLike]: nameTrimed+"%" } },
      include: [
        { model: Category },
        { model: ProdPic }
      ]
    });
	if(!products.length) throw new Error({message: `No matches for ${nameTrimed}`, status: 404});

	return products.map((el)=>valuesToReturn(el.toJSON()));
};

const searchById = async (id) => {    //busca products por id 
	let product = await Product.findByPk(id, {
		include: [
		  { model: Category },
		  { model: ProdPic }
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
	const allProducts = await Product.findAll({ include: [
		{ model: Category },
		{ model: ProdPic }
	]})
     
	return allProducts.map((el)=>valuesToReturn(el.toJSON()));
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
		category: value.Categories.map(el=>el.name) 
	}
}


module.exports = {
	getAllProducts,
	searchById,
	searchCandy,
	updateProduct,
	deleteProduct,
	createProduct
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