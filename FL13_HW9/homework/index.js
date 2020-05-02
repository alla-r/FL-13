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
    console.log('********');
    for (let j = arr[0]; j >= arr[1]; j--) {
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
const formatDate = function (date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hrs = date.getHours(); 
  let min = date.getMinutes();

  if (month < 10) { 
    month = '0' + month; 
  }

  if (day < 10) { 
    day = '0' + day; 
  }

  if (hrs < 10) { 
    hrs = '0' + hrs; 
  }

  if (min < 10) { 
    min = '0' + min; 
  }

  return `${year}/${month}/${day} ${hrs}:${min}`;
}