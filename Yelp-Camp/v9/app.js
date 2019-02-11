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

// requiring routes
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/yelp_camp_v9", { useNewUrlParser: true })
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))
// seedDB();

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
});

//using express-router
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})