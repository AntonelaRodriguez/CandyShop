const { Router } = require("express");
const {ProdPic} = require("../db.js");
const router = Router();

router.post("/", async (req, res, next)=>{
    try{
       const {image, ProductId} = req.body;
       await ProdPic.create({
          image,
          ProductId
        });
        
        const images = await ProdPic.findAll();
        res.status(200).json(images);
    }catch(error){
      next(error);
    }
});


module.exports = router;