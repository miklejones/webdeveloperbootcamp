const express = require("express"),
  app = express(),
  rp = require("request-promise"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose")

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Garland's Gulch",
//     image: "https://traveloregon.com/wp-content/uploads/2017/06/2017-lesliegulch-mikekristywestby-01.jpg",
//     description: "Garland's Gulch sits at the end of a 15-mile dirt road lined by towering rock cliffs."
//   }, (err, campground) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("New campground created");
//       console.log(campground);
//     }
//   }
// )


app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
  //GET ALL CAOMPGROUNDS FROM db
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds })
    }
  })
});

//CREATE - add new campground to database
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

//NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
  //Find the campground with the provided ID
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  })
  //render show template with that campground
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})