const express = require("express"),
  app = express(),
  rp = require("request-promise"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds");

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
seedDB();


app.get("/", (req, res) => {
  res.render("landing");
});

//===================
// Campgrounds Routes
//===================

// INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
  //GET ALL CAOMPGROUNDS FROM db
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds })
    }
  })
});

// CREATE - add new campground to database
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  //Find the campground with the provided ID
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/show", { campground: foundCampground });
    }
  })
  //render show template with that campground
})

//=======================
// COMMENTS ROUTES
//=======================

// NEW - show form to create new comment
app.get("/campgrounds/:id/comments/new", (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
})

// CREATE - Add new comment to database
app.post("/campgrounds/:id/comments", (req, res) => {
  // lookup campground using id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
  // create new comment
  // connect new comment to campground
  // redirect to campground show page
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})