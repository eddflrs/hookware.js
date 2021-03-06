/*
 * Hookware.js
 * Utility functions for functions.
 * http://github.com/eddflrs/hookware.js
 * @author Eddie Flores
 * @license MIT License
 */

/*
 * Terms used in docstrings.
 *
 * hookwared function - The function passed into hookware().
 *  i.e: hookware(myFunc); // myFunc is the 'hookwared function'
 */


/* Holds some utilities to make things easier. */

var utils = {};

utils.slice = Array.prototype.slice;

/**
 * Converts an Arguments object into an Array.
 * @param {Arguments} args
 */
utils.argsToArray = function (args) {
  return Array.prototype.slice.call(args, 0);
};

/* All hookware methods are kept in here and are attached later. */

var fn = {};

/**
 * @public
 * Bind the given function with the given context.
 * @param {Object} ctx
 */
fn.bind = function (ctx) {
  var f = this, boundFn;
  boundFn = function () {
    console.log('boundFn caleld');
    var result = f.apply(ctx, arguments);
    console.log('Result ', result);
    return result;
  };
  // console.log(boundFn);
  return hookware(boundFn);
};

/**
 * @public
 * Partially applies input arguments and returns a resulting function.
 * @param {Function} dynamic
 */
fn.curry = function () {
  var f = this, origArgs = utils.argsToArray(arguments), curriedFn;
  curriedFn = function () {
    var laterArgs = utils.argsToArray(arguments)
      , mergedArgs = origArgs.concat(laterArgs);
    return f.apply(this, mergedArgs);
  };
  return hookware(curriedFn);
};

/**
 * @public
 * Invokes the hookwared function and passes its output into the first function
 * argument. If more than one function is passed in as argument, the same
 * process is applied where the output of one argument function becomes the input
 * of the next argument function.
 * i.e: hookware(fnA).wrap(fnB, fnC); // => fnC(fnB(fnA()));
 */
fn.wrap = function () {
  var f = this
    , wrapFns = arguments;

  var wrap = function (fns, input) {

    if (!fns || fns.length < 1) {
      return input;
    }

    var result = fns[0].call(f, input)
      , nextFns = utils.slice.call(fns, 1);

    return wrap(nextFns, result);
  };

  var wrappedFn = function () {
    var result = f.apply(this, arguments);
    return wrap(wrapFns, result);
  };

  return hookware(wrappedFn);
};

/**
 * @public
 * Invokes the given function and passed its output into the hookwared function.
 * @param {Function} fn
 */

fn.before = function (fn) {
  var f = this, beforeFn;
  beforeFn = function () {
    var result = fn.apply(this, arguments);
    return f.call(this, result);
  };
  return hookware(beforeFn);
};

/**
 * @public
 * Invokes the given function with the results of the hookwared function.
 * @param {Function} fn
 */
fn.after = function (fn) {
  var f = this, afterFn;
  afterFn = function () {
    var result = f.apply(this, arguments);
    return fn.call(this, result);
  };
  return hookware(afterFn);
};

/**
 * @public
 * Attaches Hookware methods to the given function argument.
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