// Utility

Object.prototype.randomElement = function () {
  return Object.values(this).randomElement()
}

Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)]
}

Set.prototype.randomElement = function () {
  const array = Array.from(this.values())
  return array.randomElement()
}

Array.prototype.rotate = (function() {
    // save references to array functions to make lookup faster
    var push = Array.prototype.push,
        splice = Array.prototype.splice;

    return function(count) {
        var len = this.length >>> 0, // convert to uint
            count = count >> 0; // convert to int

        // convert count to value in range [0, len)
        count = ((count % len) + len) % len;

        // use splice.call() instead of this.splice() to make function generic
        push.apply(this, splice.call(this, 0, count));
        return this;
    };
})();

// the super cool Fisher-Yates shuffle
// FIXME: Move to `utils.js` file
// FIXME: Consider implementing a `shuffled` which returns a new array (and thus does not mutate the original)
export function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
