console.log("It's working dude!");

// 1. Print all number -10 to 19
var countOne = -10;

while (countOne < 20) {
    console.log(countOne);
    countOne++;
}

// 2. Print all even numbers 10-40
var countTwo = 10;

while (countTwo <= 40) {
    if (countTwo % 2 === 0) {
        console.log(countTwo);
    };
    countTwo++;
}

// 3. Print all odd numbers 300-333
var countThree = 301;
while (countThree <= 333) {
    console.log(countThree);
    countThree += 2;
}

// 4. Print all numbers divisible by 5 and 3 between 5 and 50
var countFour = 5;
while (countFour <= 50) {
    if (countFour % 5 === 0 && countFour % 3 === 0) {
        console.log(countFour);
    };
    countFour++;
}