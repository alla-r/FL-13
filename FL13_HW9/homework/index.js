'use strict';

// 1 - convert
const converter = function () {
  const arr = [];
  for (let i = 0; i < arguments.length; i++) {
    if ( typeof arguments[i] === 'number' ) {
      arr.push(String(arguments[i]));
    } else {
      arr.push(Number(arguments[i]));
    }
  }

  return arr;
}

// 2 - executeforEach
const executeforEach = function (arr, cb) {
  for ( let i = 0; i < arr.length; i++ ) {
    cb(arr[i]);
  }
}

// 3 - mapArray
const mapArray = function (arr, cb) {
  let newArr = [];
  executeforEach( arr, function (el) {
    newArr.push(cb(el));
  });

  return newArr;
}

// 4 - filterArray
const filterArray = function(arr, cb) {
  let newArr = [];
  executeforEach(arr, function (el) {
    if (cb(el)) {
      newArr.push(el);
    }
  });

  return newArr;
}

// 5 - containsValue
const containsValue = function (arr, value) {
  let result = false;
  executeforEach(arr, function (el) {
    if (el === value) {
      result = true;
    }
  });

  return result;
}

// 6 - flipOver
const flipOver = function (str) {
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }

  return newStr;
}

// 7 - makeListFromRange
const makeListFromRange = function (arr) {
  let newArr = []; 
  if ( arr[1] > arr[0] ) {
    for (let i = arr[0]; i <= arr[1]; i++) {
      newArr.push(i);
    }
  } else {
    for (let j = arr[1]; j <= arr[0]; j++) {
      newArr.push(j);
    }
  }

  return newArr;
}

// 8 - getArrayOfKeys
const getArrayOfKeys = function (arr, value) {
  let newArr = [];
  executeforEach(arr, function (el) {
    for ( let key in el) {
      if (key === value) {
        newArr.push(el[value]);
      }
    }
  });

  return newArr;
}

// 9 - substitute()
const substitute = function (arr) {
  const newArr = mapArray(arr, function (el) {
    if ( el < 20 && el > 10 ) {
      return '*';
    } else {
      return el;
    }
  });

  return newArr;
}

// 10 - getPastDay
const getPastDay = function(date, number) {
  const mlsec = number * 24 * 60 * 60 * 1000;
  const desiredDate = new Date(date - mlsec);

  return desiredDate.getDate();
}

// 11 formatDate
function makeTwoDigit (el) {
  if (el < 10) {
    el = '0' + el;
  }

  return el;
 }

const formatDate = function (date) {
  const year = date.getFullYear();
  let month = makeTwoDigit(date.getMonth() + 1);
  let day = makeTwoDigit(date.getDate());
  let hrs = makeTwoDigit(date.getHours()); 
  let min = makeTwoDigit(date.getMinutes());

  return `${year}/${month}/${day} ${hrs}:${min}`;
}