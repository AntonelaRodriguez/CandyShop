const { Review } = require('../db.js');

const postReview = async (product, author, title, description, rating) => {
  // if(!product) throw new Error ("Review needs to belong to a product")
  const newReview = await Review.findOrCreate({
    where: {
      ProductId: product
    },
    default: {
      author, 
      title, 
      description, 
      rating
    }
  })
  return newReview;
}

const getReview = async (product) => {
  const allReviews = await Review.findAll({
    where: {
      ProductId: product
    }
  })
  return allReviews;
}

module.exports = {
  postReview,
  getReview
};