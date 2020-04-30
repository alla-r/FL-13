const letterCount = function (str, char) {
  const regExp = new RegExp(char, 'gi');
  const counter = (str.match(regExp) || []).length;
  return counter;
}

letterCount("Maggy", "g");
letterCount("Barry", "b");
letterCount("", "z");