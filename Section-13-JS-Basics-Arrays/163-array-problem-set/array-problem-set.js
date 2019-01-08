alert("fuuck yo couch");


// Print the array one-by-one in reverse order
function printReverse(aRay) {
    for (var i = aRay.length; i >= 0; i--) {
        console.log(aRay[i]);
    };
};

// Is the array uniform?
function isUniform(aRay) {
    var uniform = true;
    for (var i = 0; i < aRay.length - 1; i++) {
        if (aRay[i] !== aRay[i + 1]) {
            uniform = false;
        }
    };
    return uniform;
};

// Sum of the Array 
function sumArray(aRay) {
    var arraySum = 0;
    for (var i = 0; i < aRay.length; i++) {
        arraySum += aRay[i];
    }
    return arraySum;
};

function sumArrayTwo(aRay){
    var total = 0;
    aRay.forEach(function(element) {
        total += element;
    });
    return total;
}

// Max value in the array
function max(aRay) {
    var thaMax = aRay[0];
    for (var i = 1; i < aRay.length; i++) {
        if (aRay[i] > thaMax){
            thaMax = aRay[i];
        };
    };
    return thaMax;
};

