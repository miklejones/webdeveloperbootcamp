var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/cat_app', { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 136,
//     temperament: "Evil"
// });

// george.save((err, cat) => {
//     if (err) {
//         console.log("Something went wrong");
//     } else {
//         console.log("We saved a cat to the DB");
//         console.log(cat);
//     };
// });

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, (err, cat) => {
    if (err) {
        console.log(err);
    } else {
        console.log("New cat alert!");
        console.log(cat);
    };
});

//retrieve all cats from the DB

Cat.find({}, (err, cats) => {
    if (err) {
        console.log("Oh no, ERROR!");
    } else {
        console.log("All the cats");
        console.log(cats);
    };
})