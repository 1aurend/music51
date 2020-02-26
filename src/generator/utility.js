// Utility

export function randomObjectElement(object) {
  return randomArrayElement(Object.values(object))
}

export function randomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

export function randomSetElement(set) {
    const array = Array.from(set.values())
    return randomArrayElement(array)
}

Number.prototype.mod = function(n) {
    return ((this%n)+n)%n
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
