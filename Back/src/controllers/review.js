const { Review } = require('../db.js');

const postReview = async (email, product, author, title, description, rating) => {

  // if(!product || !author || !description || !rating) throw new Error ("Fill in all arguments");

  const newReview = await Review.findOrCreate({where:{
    ProductId: product,
    UserEmail: email},
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