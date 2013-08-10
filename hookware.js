/*
 * Hookware.js
 * http://github.com/eddflrs/hookware.js
 * @author Eddie Flores
 * @license MIT License
 */

/*
 * Glossary of Terms used throughout the docstrings.
 *
 * hookwared function - The function passed into hookware().
 *  i.e: hookware(myFunc); // myFunc is the 'hookwared function'
 */

/* Holds some utilities to make things easier. */

var utils = {};

/**
 * Converts an Arguments object into an Array.
 * @param {Arguments} args
 */
utils.argsToArray = function (args) {
  return Array.prototype.slice.call(args, 0);
};

/* All hookware methods are kept in here and are attached later. */

var fn= {};

/**
 * Partially applies input arguments and returns a resulting function.
 * @public
 */
fn.curry = function () {
  var f = this;
  var origArgs = utils.argsToArray(arguments);
  return function () {
    var laterArgs = utils.argsToArray(arguments)
      , mergedArgs = origArgs.concat(laterArgs);
    return f.apply(this, mergedArgs);
  };
};


/**
 * Invokes the hookwared function and passes its output into the first function
 * argument. If more than one function is passed in as argument, the same
 * process is applied where the output of one function becomes the input of
 * the next function arugment.
 * i.e: hookware(fnA).wrap(fnB, fnC); // => fnC(fnB(fnA()));
 * @public
 */
fn.wrap = function () {
  var f = this;
  var wrapFns = arguments;
  return function () {
    var i
      , args = arguments
      , argsLength = args.length
      , result = f.apply(this, arguments);

    if (wrapFns.length > 1) {
      throw new Error('Wrap can only take 1 function arg for now');
    }
    return wrapFns[0].call(this, result);
  };
};

fn.before = function () {
  console.log('before');
};

fn.after = function () {
  console.log('after');
};


/**
 * Attaches Hookware methods to the given function argument.
 * @public
 * @param {Function} f
 */
var hookware = function (f) {
  var k;
  for (k in fn) {
    if (fn.hasOwnProperty(k)) {
      f[k] = fn[k];
    }
  }
  return f;
};

/* Attach the methods to the hookware function */

for (k in fn) {
  if (fn.hasOwnProperty(k)) {
    hookware[k] = fn[k];
  }
}

module.exports = hookware;