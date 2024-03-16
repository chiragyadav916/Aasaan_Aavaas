const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URl = "mongodb://127.0.0.1:27017/aasaan_aavaas";
async function main() {
    await mongoose.connect(MONGO_URl);
}

app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });

app.get("/", (req, res) => {
    res.send("Welcome");
});

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
    //let listing = req.body;//data is in JS object 
    let listing = req.body.listing;
    const newListing = new Listing(listing);//it gives an instance
    await newListing.save();
    res.redirect("/listings");
});

//Edit Route 
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });//deconstructing
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id/", async (req, res) => {
    let { id } = req.params;
    let deleteHotel = await Listing.findByIdAndDelete(id);
    console.log(deleteHotel);
    res.redirect(`/listings`);
});

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my new title",
//         description: "by the beach",
//         price: 1200,
//         location: "goa"
//     });
//     await sampleListing.save();
//     console.log("Saved sample");
//     res.send("Successful testing");
// });

const port = 8080;
app.listen(port, () => {
    console.log('Listening on port ' + port);
});