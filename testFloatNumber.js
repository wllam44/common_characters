const ocrData = require('./OCR_clone_data');

const regex = /[+-]?\d+(\.\d+)?/g;

const textCase = 'TOTAL.\n336.00 eqwjebqb3.6 oano1oije.q5 -doas5123 1,350';

//console.log(textCase.replace(/[,]/g, '').match(regex));

console.log(ocrData.length);