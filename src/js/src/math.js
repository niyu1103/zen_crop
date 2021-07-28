
// Math ----------------------------------------------

const radians = (degrees) => {
  return degrees * Math.PI / 180;
}

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

const mapNum = (value, start1, stop1, start2, stop2) => {
  return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2
}

//00桁表示
const getdoubleDigestNumer = (number) => {
  return ("0" + number).slice(-2);
}

const randomNum = (a, b) => {
  let result = Math.floor(Math.random() * (b - a + 1) + a);
  return result;
}

const shuffle = (array) => {
  let newArray = [];
  while (array.length > 0) {
    const n = array.length;
    const k = Math.floor(Math.random() * n);
    newArray.push(array[k]);
    array.splice(k, 1);
  }
  return newArray;
}


export { shuffle, randomNum, mapNum };
