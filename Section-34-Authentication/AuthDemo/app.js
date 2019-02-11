var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/auth_demo", { useNewUrlParser: true })

const PORT = process.env.PORT || 3001;

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Raj is a duck.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=========
// ROUTES
//=========

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret")
})

//==================
// AUTH ROUTES
//==================

// show sign up form
app.get("/register", (req, res) => {
    res.render("register");
})
// handling user sign up
app.post("/register", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, User) => {
        if (err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret");
            });
        };
    });
});
// LOGIN ROUTES
// render login form
app.get("/login", (req, res) => {
    res.render("login");
});

// login logic
// middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    };
    res.redirect("/login")
}

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})