var answer = prompt("Are we there yet?");

while (answer.indexOf('yes') === -1 && answer !== 'yea') {
    var answer = prompt("Are we there yet?");
}

alert("We made it!");

// VERSION 2
// var answer = prompt("Are we there yet?");

// while (answer.indexOf("yes") === -1) {
//     var answer = prompt("Are we there yet?");
// }

// alert("We made it!");
