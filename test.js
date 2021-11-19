
const { serialize } = require("v8");
const stringSimilarity = require("./node_modules/string-similarity");

const text = '123 by ella';

const input = '';

if(text.includes(input)){
  console.log(true);
} else {
  console.log(false);
}

const num = '123 abc 032 oewqoqw12我是!!';

const seoncd = num.replace(/[\d#$%^&*().,!:''-=]+/g, '');
console.log(seoncd);