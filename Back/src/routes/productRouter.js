const { Router } = require('express')
const productRouter = Router()
const { getAllProducts, searchCandy, searchById, updateProduct, deleteProduct, createProduct, filteringProducts, IdspurchasedProducts } = require('../controllers/product')
// const { Product, Category } = require('../db.js')
// const dbProducts = require("../../dbProducts.json");
// const dbCategories = require("../../dbCategories.json");

productRouter.get("/", async (req, res, next) => {  //busca todos los products
	try {
	  const allProducts = await getAllProducts();
		// if(!allProducts.length) {
    //   await Category.bulkCreate(dbCategories);
    //   for(let i=0; i<dbProducts.length; i++) {
    //     let product = await Product.create(dbProducts[i]);
    //     let categoryProduct = await Category.findAll({ where: { name: dbProducts[i].category } });
    //     await product.addCategories(categoryProduct);
    //   }
    // }
	  res.status(201).json(allProducts);
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

productRouter.get("/filters", async (req, res, next) => {
	try {
	  let results = await filteringProducts(req.query);
	  res.json(results);
	} catch (error) {
	  next(error);
	}
  });
	productRouter.get("/purchasedProducts/:email", async (req, res, next) => {
		try {
			let results = await IdspurchasedProducts(req.params.email);
			res.json(results);
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

// productRouter.post("/:idProduct/category/:idCategory", async (req, res, next) => {   //realiza la relacion entre categoria y producto
// 	try {
// 	  let category = await Category.findByPk(req.params.idCategory);
// 	  let product = await Product.findByPk(req.params.idProduct)
// 	  await product.addCategory(category)
// 	  return res.send({ msg: "Relation Category-Product estableced!"})
// 	} catch (error) {
// 	  next(error);
// 	}
// });


// productRouter.post("/", async (req, res, next) => {    //crea un product nuevo
// 	const {name, description, price, availability, image, stock, brand, tacc} = req.body;
// 	try {
// 	  const product = await Product.create({ ...req.body });
// 	  res.status(201).json(product);
// 	} catch (error) {
// 	  next(error);
// 	}
// });

productRouter.post("/", async (req, res, next)=>{
    try{
        const {name,description,price,brand,image,stock,tacc, category} = req.body;
        const result = await createProduct(name,description,price,brand,image,stock,tacc,category);
        res.status(201).json(result);
    }catch(error){
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