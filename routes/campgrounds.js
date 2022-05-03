const express = require('express');
const app = express();
const router = express.Router();
const catchAsync = require('../utilities/catchAsync.js');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground.js');
const campgrounds = require('../controllers/campgrounds')
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware.js');
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});

//=======================================================================




//========================================================================

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));


router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.campgroundDetails))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))
    

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));





module.exports = router;