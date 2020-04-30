const countPoints = function (array) {
  let points = 0;
  array.forEach( element => {
    const result = element.split(":");
    if (result[0] > result[1]) {
      points += 3;
    } else if (result[0] === result[1]) {
      points += 1;
    }
  });

  return points;
}

countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']);
countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0']);