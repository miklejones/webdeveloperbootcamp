const express = require("express"),
  app = express(),
  passport = require("passport"),
  mongoose = require("mongoose"),
  rp = require("request-promise"),
  bodyParser = require("body-parser"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/yelp_camp_v6", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Toy Story is a great movie!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next()
})


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
      res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user })
    }
  });
});

// CREATE - add new campground to database
app.post("/campgrounds", isLoggedIn, (req, res) => {
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
app.get("/campgrounds/new", isLoggedIn, (req, res) => {
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
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
app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
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

//=================
// AUTH ROUTES
//=================

//show register form
app.get("/register", (req, res) => {
  res.render("register");
});

//handle sign up logic
app.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register")
    };
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds")
    });
  });
});

//show login form
app.get("/login", (req, res) => {
  res.render("login");
});

//handling login logic
app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (req, res) => {

  });

// Logout Route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})