const positiveSum = function(array) {
  let sum = 0;
  array.forEach( element => {
    if (element > 0) {
      sum += element;
    }
  });
  return sum;
}

positiveSum([2, 4, 6, 8]);
positiveSum([0, -3, 5, 7]);