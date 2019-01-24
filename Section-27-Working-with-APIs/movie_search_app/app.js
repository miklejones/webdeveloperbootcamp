var express = require('express');
var app = express();
const rp = require('request-promise');
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search")
})

app.get("/results", (req, res) => {
    var searchTerm = req.query.search;
    var url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=thewdb`

    rp(url)
        .then((body) => {
            const data = JSON.parse(body)
            res.render('results', { data: data });
        })
        .catch((err) => {
            console.log('Error!', err);
        })

})

app.listen(3001, () => {
    console.log("Listening on localhost/3001")
})