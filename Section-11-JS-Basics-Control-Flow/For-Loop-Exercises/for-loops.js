// 1. -10 TO 19
console.log("-10 TO 19");
for (i = -10; i <= 19; i++) {
    console.log(i);
}

// 2. EVEN 10 TO 40
console.log("EVEN 10 TO 40");
for (i = 10; i <= 40; i++) {
    if (i % 2 === 0) {
        console.log(i);
    };
}

// 3. ODD 300 TO 333
console.log("ODD 300 TO 333");
for (i = 300; i <= 333; i++) {
    if (i % 2 !== 0) {
        console.log(i);
    };
}

// 4. DIVISIBLE BY 5 AND 3 FROM 5 TO 50
console.log("DIVISIBLE BY 5 AND 3 FROM 5 TO 50");
for (i = 5; i <= 50; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log(i);
    };
}