const Listing= require("../models/listing.js");
const Review= require("../models/review.js");

module.exports.createReview=async(req, res)=>
{
    let listing = await Listing.findById(req.params.id);
    console.log(req.params.id);
    let newReview= new Review(req.body.review)

    newReview.author=req.user._id;

    listing.reviews.push(newReview);

    let res1=await newReview.save();

    let res2=await listing.save();

    req.flash("success", "Your Review has been Created");

    res.redirect(`/listings/${listing._id}`);


}

module.exports.destroyReview= async(req, res)=> {
    let {id, reviewId} = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);


    req.flash("success", "Your Review has been Deleted");
    res.redirect(`/listings/${id}`);
}