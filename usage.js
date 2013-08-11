var hookware = require('./hookware');
var codein = require('node-codein');

var log = console.log;

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

greet = function (name) {
  return "hello " + name + "!";
}

var o = {
  foo: function () { console.log('foo');}
}

var dump = function () {
  this.foo();
  return "hello dump";
};

var dumpIt = hookware(dump).bind(o);

log(dumpIt());