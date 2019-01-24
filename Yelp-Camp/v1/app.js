const express = require("express");
const app = express();
const rp = require("request-promise");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let campgrounds = [
    { name: 'Bear Grove', image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f8c37fafefbcb8_340.jpg" },
    { name: 'Granit Hill', image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
    { name: 'Bear Grove', image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f8c37fafefbcb8_340.jpg" },
    { name: 'Granit Hill', image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
    { name: 'Bear Grove', image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f8c37fafefbcb8_340.jpg" },
    { name: 'Granit Hill', image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
    { name: 'Bear Grove', image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f8c37fafefbcb8_340.jpg" },
    { name: 'Granit Hill', image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
    { name: 'Bear Grove', image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104491f8c37fafefbcb8_340.jpg" },
    { name: 'Granit Hill', image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg" },
    { name: 'Mountain Rest', image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f8c37fafefbcb8_340.jpg" }
];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    // let campgroundsData = JSON.parse(campgrounds)
    res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", (req, res) => {
    //get data from form and add to array
    let CGname = req.body.name;
    let CGimage = req.body.image;
    let newCampground = { name: CGname, image: CGimage };
    campgrounds.push(newCampground);
    //redirect back to campground page
    res.redirect("/campgrounds");
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
})

app.listen(3001, "localhost", () => {
    console.log("Listening on port 3001");
})