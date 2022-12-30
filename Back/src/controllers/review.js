const { Review, Product, User } = require('../db.js');

const postReview = async (productId, email, author, title, description, rating) => {

  if(!productId || !email || !author || !description || !rating) throw new Error ("Fill in all arguments");

  const reviewedProduct = await Product.findByPk(productId)
  const reviewer = await User.findByPk(email)
  const newReview = await Review.create({author, title, description, rating})

  reviewer.addReview(newReview)
  reviewedProduct.addReview(newReview)
  
  return newReview;
}

const getAllReviews = async (productId) => {
  if(!productId) throw new Error('Must provide a product ID')
  const allReviews = await Review.findAll({where: {
    ProductId: productId
  }})
  return allReviews;
}

module.exports = {
  postReview,
  getAllReviews
};