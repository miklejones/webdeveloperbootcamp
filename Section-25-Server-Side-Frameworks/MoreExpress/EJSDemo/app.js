var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home.ejs");
})

app.get("/fallinlovewith/:thing", function (req, res) {
    var thing = req.params.thing;
    res.render("love.ejs", { thingVar: thing });
})

app.get("/posts", function (req, res) {
    var posts = [
        { title: 'post', author: 'you' },
        { title: 'post2', author: 'you2' },
        { title: 'post3', author: 'you3' }
    ];

    res.render("posts.ejs", { posts: posts })
})

app.listen(3000, function (req, res) {
    console.log('Server is listening');
})