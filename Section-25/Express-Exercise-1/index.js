console.log("Your firing up that first refresher express app boi!");

var express = require("express");
var app = express();

app.get("/", function (req, res) {
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function (req, res) {
    console.log(req.params);
    var sound = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof Woof',
        cat: 'I hate you human',
        goldfish: 'Glub, Glub'
    }
    var animal = req.params.animal;
    var animalSound = "";
    res.send(`The ${animal} says '${sound[animal]}'.`);
});

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
    for(var i=0; i < times; i++){
        result += `${message} `;
    }
    res.send(`You want me to repeat '${message}' ${times} times!? Fine: ${result}`)
})

app.get("*", function(req, res){
    res.send("Sorry, that page is not found. What are you even doing with your life?")
})

app.listen(3000, function () {
    console.log("Serving your first express app on port 3000");

});
