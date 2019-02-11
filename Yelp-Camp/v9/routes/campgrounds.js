var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");



//===================
// Campgrounds Routes
//===================

// INDEX - show all campgrounds
router.get("/", (req, res) => {
    //GET ALL CAOMPGROUNDS FROM db
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user })
        }
    });
});

// CREATE - add new campground to database
router.post("/", isLoggedIn, (req, res) => {
    //get data from form and add to array
    let CGname = req.body.name;
    let CGimage = req.body.image;
    let CGdesc = req.body.description;
    let newCampground = { name: CGname, image: CGimage, description: CGdesc };
    // Crreate a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreate) => {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campground page
            res.redirect("/campgrounds");
        }
    })
})

// NEW - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
    //Find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    })
    //render show template with that campground
});

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

module.exports = router;