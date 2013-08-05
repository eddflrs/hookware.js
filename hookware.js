// hookware.wrap = function (fn) {
//   fn.with = hookware.wrap.with;
//   return fn;
// };

// hookware.wrap.with = function (fn) {
//   var self = this;
//   var wrappedFn = function () {
//     var result = self.apply(this, arguments);
//     return fn.call(this, result);
//   };
//   return hookware.wrap(wrappedFn);
// };






exports.hookware = hookware;
