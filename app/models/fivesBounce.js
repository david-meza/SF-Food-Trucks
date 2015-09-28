// Write a function `fivesBounce()` that takes an integer ​*n*​ and returns an array. 
// The array should contain a sequence of numbers that fall by 5 until the number 
// is less than or equal to zero, then rise by 5 until returning to ​*n*​.

// **The challenge: Do this without a loop!**


function fivesBounce (n) {
  var results = [];
  helper(results, n, -5, 0)
  return results;
}

function helper(results, num, incr, target) {
  if (num + incr > target) {
    helper(results, num + incr, incr, target);
    results.push(num + incr);
    results.unshift(num + incr);
  } else {
    results.push(num + incr);
  }
  
}

fivesBounce(4);
//-> [4, -1, 4]

fivesBounce(10);
//=> [10, 5, 0, 5, 10]

fivesBounce(16);
//=> [16, 11, 6, 1, -4, 1, 6, 11, 16]