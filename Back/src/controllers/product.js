const { Router } = require("express");
const { Op } = require("sequelize");
const { Product, ProdPic, Category } = require('../db.js')

const searchCandy = async (name) => {
	if(!name) return res.status(400).json({ msg: "Value is undefined" });
	let nameTrimed = name.replace(/^\s+|\s+$/, "");
	if(!nameTrimed.length) return res.status(400).json({ msg: "Value is empty string!" });
	let products = await Product.findAll({
      where: { name: { [Op.iLike]: nameTrimed+"%" } },
      include: [
        { model: Category },
        { model: ProdPic }
      ]
    });
	if(!products.length) return res.status(404).json({ msg: `No matches for ${nameTrimed}`})
	return products
}

const searchById = async (id) => {
	let product = await Product.findByPk(id, {
		include: [
		  { model: Category },
		  { model: ProdPic }
		]
	  });
	  if(!product) return res.status(404).json({ msg: `No matches for id: ${id}`})
	  return product
}

const updateProduct = async (body, id) => {
	let updateds = await Product.update(
		{ ...body },
		{ where: { id: id } }
	  );
	return updateds
}

const deleteProduct = async (id) => {
    let deleted = await Product.destroy({ where: { id: id } });
	return deleted
}

const getAllProducts = async () => {
	const allProducts = await Product.findAll({ include: [
		{ model: Category },
		{ model: ProdPic }
	]})
	return allProducts
}

module.exports = {
	getAllProducts,
	searchById,
	searchCandy,
	updateProduct,
	deleteProduct
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