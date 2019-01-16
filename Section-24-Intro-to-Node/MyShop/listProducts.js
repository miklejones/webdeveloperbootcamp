var faker = require('faker');

var randomProduct = faker.commerce.productName();
var randomPrice = faker.commerce.price();

for (var i = 0; i < 10; i++) {
    console.log(i+1 + ' ' + faker.commerce.productName() + " - $" + faker.commerce.price());
}