let tenantData = require('./data/tenant_data');
const stringSimilarity = require("./node_modules/string-similarity");

const getTenantById = (id) => {
  return tenantData.find((item) => item.id === id);
}

const getRating = (str1, str2) => {
  return stringSimilarity.compareTwoStrings(str1, str2);
}

console.log(getTenantById('604650a56bb6d60008165ae0').name)
console.log(getTenantById('6048ea6ec42cca00081d99a8').name)


console.log(getRating('759 store', 'store  min'));
console.log(getRating('OK便利店 (淘大商場)', '便利店'))

const str1 = 'Tao Heung Tea House (Amoy Plaza)'.toLowerCase();
const str2 = 'TẠO HEUNG'.toLowerCase();

console.log(str1);
console.log(str2);

if(str1.includes(str2)){
  console.log(true);
}

console.log('A'.charCodeAt(0));
