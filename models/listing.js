const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const Listing = mongoose.model("Listing", lisitingSchema);
module.exports = Listing;