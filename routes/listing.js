const express= require("express");
const router= express.Router();
const {listingSchema, reviewSchema}= require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isLoggedIn}= require("../middleware.js");
const {saveRedirectUrl, isOwner, validateListing} = require("../middleware");
const multer=require("multer");
const {storage}= require("../cloudConfig.js");
const upload= multer({storage});

const listingController= require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,validateListing,
        upload.single('listing[image]')
        ,wrapAsync(listingController.createListing)
    );


router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner, upload.single('listing[image]'),
        validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));




router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports=router;