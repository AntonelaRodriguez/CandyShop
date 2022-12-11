const { Router } = require("express") 
const categoryRouter = Router()
const { Category } = require('../db.js')



categoryRouter.get("/categories", async (req, res, next) => { //busca todas las categories
	try {
	  let categories = await Category.findAll();
	  return res.status(200).send(categories)
	} catch (error) {
	  next(error);
	}
});

categoryRouter.post("/category", async (req, res, next) => {    //busca o agrega una categoria
	try {
		const { name } = req.body;
        let newName = name.toLowerCase();
	    let category = await Category.findOrCreate({
		where: { name: newName }
	  });
	  return res.status(201).send(category)
	} catch (error) {
	  next(error);
	}
});
