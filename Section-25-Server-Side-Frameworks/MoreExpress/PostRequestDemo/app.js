var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var friends = ['tony', 'tom', 'becky', 'lily']
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.post("/addfriend", function (req, res) {
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    // res.send("You have reached the POST route!")
    res.redirect("/friends");
});

app.get("/friends", function (req, res) {
    res.render("friends", { friends: friends });
});

app.get("*", function (req, res) {
    res.send("Bad Move");
});



app.listen(3000, function (req, res) {
    console.log("Server now running on localhost:3000");

});