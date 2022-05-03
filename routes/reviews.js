const express = require('express');
const router = express.Router({mergeParams: true});

const catchAsync = require('../utilities/catchAsync.js');
const ExpressError = require('../utilities/ExpressError');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware.js')
const Review = require('../models/review.js')
const Campground = require('../models/campground.js');
const reviews = require('../controllers/reviews.js');

const {reviewSchema} = require('../schemas.js');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))    

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
