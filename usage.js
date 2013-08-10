var hookware = require('./hookware');

var log = console.log;

// log.curry();
// log.after();
// log.before();
// log.wrap();

// Alternative usage example

var adder = function (a, b) {
  return a + b;
};

var doubleThat = function (n) {
  return 2 * n;
};

var tripleThat = function (n) {
  return 3 * n;
}


// Lets test the curry method.

var addTwo = hookware(adder).curry(2);
log('addTwo ', addTwo(8) === 10);

// Lets test the wrap method.

var addThenHextuple = hookware(adder).wrap(doubleThat, tripleThat);
log('addThenHextuple ', addThenHextuple(1, 2) === 18);