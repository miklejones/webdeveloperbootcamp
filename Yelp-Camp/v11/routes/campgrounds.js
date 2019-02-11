var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");



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
router.post("/", middleware.isLoggedIn, (req, res) => {
  //get data from form and add to array
  let CGname = req.body.name;
  let CGimage = req.body.image;
  let CGdesc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  let newCampground = { name: CGname, image: CGimage, description: CGdesc, author: author };
  // Crreate a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campground page
      res.redirect("/campgrounds");
    }
  })
})

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
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
  });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render("campgrounds/edit", { campground: foundCampground });
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  //find and update the correct campground
  Campground.findOneAndUpdate({ _id: req.params.id }, req.body.campground, (err, updatedCampground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
  //redirect to show page
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds")
    }
  })
});



module.exports = router;