const { Router } = require('express')
const productRouter = Router()
const { getAllProducts, searchCandy, searchById, updateProduct, deleteProduct } = require('../controllers/product')
const { Product, Category } = require('../db.js')

productRouter.get("/", async (req, res, next) => {  //busca todos los products
	try {
	  const allProducts = await getAllProducts()
	  res.json(allProducts);
	} catch (error) {
		next(error);
	}
});

productRouter.get("/search", async (req, res, next) => {  //busca los products por matcheo parcial
	const { name } = req.query;
	try {
		const products = await searchCandy(name)
		res.json(products);
	} catch (error) {
		next(error);
	}
});

productRouter.get("/categories", async (req, res, next) => { //busca todas las categories
	try {
	  let categories = await Category.findAll();
	  return res.status(200).send(categories)
	} catch (error) {
	  next(error);
	}
});

productRouter.get("/:id", async (req, res, next) => {   //busca productos por id
	try {
	  const product = await searchById(req.params.id)
	  res.json(product);
	} catch (error) {
	  next(error)
	}
});

productRouter.post("/:idProduct/category/:idCategory", async (req, res, next) => {   //realiza la relacion entre categoria y producto
	try {
	  let category = await Category.findByPk(req.params.idCategory);
	  let product = await Product.findByPk(req.params.idProduct)
	  await product.addCategory(category)
	  return res.send({ msg: "Relation Category-Product estableced!"})
	} catch (error) {
	  next(error);
	}
});

  
productRouter.post("/category", async (req, res, next) => {    //busca o agrega una categoria
	try {
	  let category = await Category.findOrCreate({
		where: { name: req.body.name }
	  });
	  return res.status(201).send(category)
	} catch (error) {
	  next(error);
	}
});


productRouter.post("/", async (req, res, next) => {    //crea un product nuevo
	const {name, description, price, availability, image, stock, brand, tacc} = req.body;
	try {
	  const product = await Product.create({ ...req.body });
	  res.status(201).json(product);
	} catch (error) {
	  next(error);
	}
});


productRouter.put("/:id", async (req, res, next) => {    //actualiza data de un producto ya existente
	try {
	  const update = updateProduct(req.body, req.params.id)
	  if (!update) return res.status(404).json({ msg: "There is not Product with that id!" });
	  res.status(200).json({ msg: "Product updated successfully!" });
	} catch (error) {
	  next(error);
	}
})

productRouter.delete("/:id", async (req, res, next) => {    //elimina un producto de la db
	try {
	  const deleted = await deleteProduct(req.params.id)
	  if (!deleted) return res.status(404).json({ msg: "There is not Product with that id!" });
	  return res.status(200).json({ msg: "Product deleted successfully!" });
	} catch (error) {
	  next(error);
	}
})


module.exports = productRouter