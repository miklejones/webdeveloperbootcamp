// alert("It's alive");

console.log("Function isEven()");
function isEven(test) {
    if (test % 2 === 0) {
        return true;
    } else {
        return false;
    };
};


console.log("Function factorial()");
function factorial(numTest) {
    var factorialized = 1;
    for (var i = 2; i <= numTest; i++) {
        factorialized = factorialized * i;
    }
    return factorialized;
};



console.log("Function kebabToSnake()");
function kebabToSnake(kebab) {
    var snaked = kebab.replace(/-/g, "_");
    return snaked;
}
