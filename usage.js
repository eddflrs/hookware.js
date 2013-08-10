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

var quadrupleThat = function (n) {
  return 4 * n;
}

// Lets test the curry method.

var addTwo = hookware(adder).curry(2);
log('addTwo ', addTwo(8) === 10);

// Lets test the wrap method.

var addThenHextuple = hookware(adder).wrap(doubleThat, tripleThat);
log('addThenHextuple ', addThenHextuple(1, 2) === 18);

// Lets tes the before method.

var ensureEvens = function () {
  var i, areEvens = true, argsLength = arguments.length;

  for (i = 0; i < argsLength; i += 1) {
    if((arguments[i] % 2) !== 0) {
      return false;
    }
  }

  return areEvens;
};

var greet = function (name) {
  return "hello " + name + "!";
}

var toUpper = function (str) {
  return str.toUpperCase();
}

var hollerName = hookware(greet).before(toUpper);

log(hollerName('eddo'));

var hollerGreeting = hookware(greet).after(toUpper);
log(hollerGreeting('eddo'));
