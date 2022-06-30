/*
firstItem = cool

first loop (lock):
  loop characters in cool:
    1. c
      lock -> lok, 4 > 3, so exist, result = ['c'], arr[i] = lok
    2. o
      lok -> lk, 3 > 2, so exist, result = ['c', 'o'], arr[i] = lk;
    3. o
      lk -> lk, 2 = 2, so doesn't exist, result = ['c', 'o'], arr[i] = lk;
    4. 1


second loop (cook):
  loop characters in co:
    1. c
      cook -> ook, 4 > 3, so exist, result = ['c'], arr[i] = ook;
    2. o
      ook -> ok, 3 > 2, so exist, result = ['c', 'o'], arr[i] = ok;
*/


const getCommonCharacters = (arr) => {
  let firstItem = arr[0];
  let result = [...firstItem];

  for (let i = 1; i < arr.length; i += 1) {
    result = result.filter((c) => {
      const length = arr[i].length;
      arr[i] = arr[i].replace(c, "");
      return length > arr[i].length;
    })
  }

  return result;
}


// const words = ["bella","label","roller"];
const words = ["cool","lock","cook"]

console.log(getCommonCharacters(words));