const express = require("express"),
  app = express(),
  passport = require("passport"),
  mongoose = require("mongoose"),
  rp = require("request-promise"),
  User = require("./models/user"),
  flash = require("connect-flash"),
  bodyParser = require("body-parser"),
  Comment = require("./models/comment"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campground"),
  methodOverride = require("method-override"),
  seedDB = require("./seeds");


// requiring routes
var commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

const PORT = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost:27017/yelp_camp_v11", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB()

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


//using express-router
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})