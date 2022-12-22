const { Router } = require("express");
const { getReview, postReview } = require('../controllers/review');
const reviewRouter = Router();

reviewRouter.get("/:product", async (req, res, next) => {
  const {product} = req.params;
  try {
    const reviews = await getReview(product);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.post("/", async (req, res, next) => {
  try {
    const {product, author, title, description, rating} = req.body;
    // if (!product) res.status(400).json("Review has to belong to a product");
    const newReview = await postReview(product, author, title, description, rating)
    res.status(200).json(newReview);
  } catch (error) {
    next(error)
  }
});

module.exports = reviewRouter;