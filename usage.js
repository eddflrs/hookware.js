// var decorate = require('./decorate').decorate;

function adder (a, b) {
  return a + b;
};

function doubleThat (n) {
  return 2 * n;
}

function tripleThat (n) {
  return 3 * n;
}


var hookware = require('./hookware').hookware;

var quadrupleThat = hookware.wrap(doubleThat).with(doubleThat);
var addThenQuadruple = hookware.wrap(adder).with(quadrupleThat);


var res = addThenQuadruple(3, 1); // => 16



var doubleEven = hookware.before(doubleThat).verify(evenNumber);

console.log(doubleEven(13));