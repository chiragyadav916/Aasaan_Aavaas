// delecaring schema for Listing

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const lisitingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Vector-Hotel-PNG-File-Download-Free.png",
        set: (v) => v === "" ? "https://www.pngall.com/wp-content/uploads/5/Vector-Hotel-PNG-File-Download-Free.png" : v,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [//review model
        {
            type: Schema.Types.ObjectId, //storing object for particular reviews
            ref: "Review"//reference is review model
        }
    ]
});

//creating middleware for deleting all reviews assocaited to particular listing
lisitingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {//if any listing is come
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const Listing = mongoose.model("Listing", lisitingSchema);
module.exports = Listing;