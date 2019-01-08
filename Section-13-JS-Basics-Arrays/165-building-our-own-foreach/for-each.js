function myForEach(arr, func) {
    // LOOP THROUGH ARRAY
    for (var i = 0; i < arr.length; i++) {
        // CALL FUNC FOR EACH ITEM IN ARRAY
        func(arr[i]);
    };
};

Array.prototype.myForEach = function (func) {
    for (var i = 0; i < this.length; i++) {
        func(this[i]);
    }
};