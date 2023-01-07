const { Router } = require("express");
const { getAllReviews, postReview, updateReview, deleteReview } = require('../controllers/review');
const reviewRouter = Router();
const { Review } = require('../db.js');



reviewRouter.post("/:productId/:email", async (req, res, next) => {
  const { author, title, description, rating} = req.body;
  const { productId, email } = req.params
  const equalReview = await Review.findOne({where : {author : author}})
  try {
    if(equalReview) throw new Error('You can only post one review per product.')
    const newReview = await postReview(productId, email, author, title, description, rating)
    res.status(200).json(newReview);
  } catch (error) {
    next(error)
  }
});
reviewRouter.get("/:productId", async (req, res, next) => {
  const {productId} = req.params;
  try {
    const reviews = await getAllReviews(productId)
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

reviewRouter.put("/admin/updateReview/:id", async (req, res, next) => {
  const {id} = req.params;
  const {author, title, description, rating} = req.body
  try {
    const review = updateReview(id, author, title, description, rating)
    return res.status(200).send("Review updated")
  } catch (error) {
    next(error);
  }
})

reviewRouter.delete("/admin/deleteReview/:id", async (req, res, next) => {
  const {id} = req.params;
  try {
    await deleteReview(id);
    res.status(200).send("Review deleted")
  } catch (error) {
    next(error);
  }
})

module.exports = reviewRouter;