let ocrData = require('./data/OCR_prod_data_1');

const getStatisticsData = (ocrData, displayText, displayDetails) => {
  let totalOCR = 0;
  let amountMatched = 0;
  let isPaymentSlipCount = 0;
  let byNLP = 0;
  let byCondStatement = 0;
  let amountMatchedByNLP = 0;
  let amountMatchedByCondStatement = 0;

  for(var i=0; i<ocrData.length; i++){
    const item = ocrData[i];

    if(item.isPaymentSlip){
      isPaymentSlipCount++;
    }

    if(item.lookupSuggestionObject && item.submitObject){
      totalOCR++;

      if(!isNaN(item.lookupSuggestionObject.amount) && !isNaN(item.submitObject.amount)){
        const isAmountMatched = parseFloat(item.lookupSuggestionObject.amount).toFixed(2) === item.submitObject.amount.toFixed(2);

        if(isAmountMatched){
          amountMatched++;
        }
        else{
          if(displayText && item.lookupSuggestionObject.amountBy !== 'nlp'){
            console.log('lookupSuggestionObject.amountby:', item.lookupSuggestionObject.amountBy);
            console.log('lookupSuggestionObject.amount:', item.lookupSuggestionObject.amount);
            console.log('submitObject.amount:', item.submitObject.amount);
            console.log('ocr.text:', item.resultObject.nlpData.text);
            console.log('');
          }
        }

        if(item.lookupSuggestionObject.amountBy === 'nlp'){
          byNLP++;
          if(isAmountMatched){
            amountMatchedByNLP++;
          }
        }
        else if(item.lookupSuggestionObject.amountBy === 'conditional statements'){
          byCondStatement++;
          if(isAmountMatched){
            amountMatchedByCondStatement++;
          }
        }
      }
    }
  }

  console.log('total ocr:', totalOCR);
  //console.log('paymentslip:', isPaymentSlipCount);
  //console.log('recceipt:', ocrData.length - isPaymentSlipCount);
  if(displayDetails){
    console.log('by NLP:', byNLP);
    console.log('by Conditional Statements:', byCondStatement);
    console.log('amount matched by NLP:', amountMatchedByNLP);
    console.log('amount matched by Conditional Statements:', amountMatchedByCondStatement);
  }
  console.log('amount matched:', amountMatched);
  console.log('amount matched (%):', amountMatched / totalOCR * 100);
  console.log('');
}

const allowedAmountText = (string) => {
  if(string.includes('transaction amount over')){
    return false;
  }
  if(string.includes('EXP DATE')){
    return false;
  }
  if(string.includes('APP CODE')){
    return false;
  }
  if(string.includes('RC 00')){
    return false;
  }
  if(string.includes('Cardholder')){
    return false;
  }
  if(string.includes('MEMBER NO')){
    return false;
  }
  if(string.includes('VISA ****')){
    return false;
  }
  if(string.includes('MasterCard ****')){
    return false;
  }
  if(string.includes('點菜總數')){
    return false;
  }
  if(string.includes('Sub-Total')){
    return false;
  }
  if(string.includes('項目總計')){
    return false;
  }
  return true;
}

const regexpAmount = (index, splitText) => {
  const foundAmount = splitText[index].replace(/[,]/g, '').replace(/\s+/g, '').match(/[\$]?\d+(\.\d+)?/g);

  if(foundAmount && foundAmount.length > 0){
    const amount = parseFloat(foundAmount[0].replace('$', ''));

    if(amount >= 50 && amount <= 50000 && allowedAmountText(splitText[index])){
      return amount;
    }
  }
  return null;
}

const isNumber = (value) => {
  return !isNaN(value) && value !== undefined && value !== null && value !== false;
}

const linearSearchAmount = (index, splitText, first, last) => {
  let foundAmount = null;
  let tempIndex = index;

  if (!first && !last) {
    while (tempIndex < splitText.length && !foundAmount) {
      foundAmount = regexpAmount(tempIndex, splitText);
      tempIndex += 1;
    }
  } else if (isNumber(first) && isNumber(last)) {
    const indexForLast = tempIndex;
    while (tempIndex > 0 && tempIndex >= first && !foundAmount) {
      foundAmount = regexpAmount(tempIndex, splitText);
      tempIndex -= 1;
    }
    tempIndex = indexForLast;
    while (tempIndex < splitText.length && tempIndex <= last && !foundAmount) {
      foundAmount = regexpAmount(tempIndex, splitText);
      tempIndex += 1;
    }
  } else if (isNumber(first)) {
    while (tempIndex > 0 && tempIndex >= first && !foundAmount) {
      foundAmount = regexpAmount(tempIndex, splitText);
      tempIndex -= 1;
    }
  } else if (isNumber(last)) {
    while (tempIndex < splitText.length && tempIndex <= last && !foundAmount) {
      foundAmount = regexpAmount(tempIndex, splitText);
      tempIndex += 1;
    }
  }

  return foundAmount;
};

getStatisticsData(ocrData);

for(var i=0; i<ocrData.length; i++){
  const item = ocrData[i];
  let foundAmount = '';
  if(item.resultObject){
    if(item.resultObject.nlpData.entities){
      if(item.resultObject.nlpData.entities.totalPrice){
        const amount = item.resultObject.nlpData.entities.totalPrice.length > 0 ? item.resultObject.nlpData.entities.totalPrice[0].content : '';
        foundAmount = amount.replace(/[,]/g, '').match(/[+-]?\d+(\.\d+)?/g);
        if (foundAmount && foundAmount.length > 0) {
          ocrData[i].lookupSuggestionObject.amountBy = 'nlp';
        }
      }
    }
    if(item.resultObject.nlpData.text && !foundAmount){
      ocrData[i].lookupSuggestionObject.amountBy = 'conditional statements';
      const keyWords = ['Amount Paid', '收款', '實收', '總計', '總額', '總數', '付款方式', '已付金額', '訂單金額', '交易金額', '扣除金額', 'Base', 'MASTERCARD', 'MASTER', 'VISA', 'OCTOPUS', '八達通', '支付寶', '合計', 'total'];
      const splitText = item.resultObject.nlpData.text.split('\n');
      let foundAmount = '';

      for(let j = 0; j < keyWords.length && !foundAmount; j += 1){
        const keyWord = keyWords[j];
        const foundIndex = splitText.findIndex((item) => item.toLowerCase().includes(keyWord.toLowerCase()) && allowedAmountText(item.toLowerCase()));
        
        if(keyWord === 'Amount Paid' && foundIndex > -1){
          const last = foundIndex + 1 < splitText.length ? foundIndex + 1 : splitText.length - 1;
          const indexToCheckDiscount = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          const discount = splitText[indexToCheckDiscount].replace(/[,]/g, '').replace(/\s+/g, '').match(/-\d+(\.\d+)?/g);
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
      
          if(discount){
            foundAmount = foundAmount - discount[0].replace('-', '');
          }
        }
        else if(keyWord === '收款' && foundIndex > -1){
          const first = foundIndex - 2 > 0 ? foundIndex - 2 : 0;
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, first, last);
        }
        else if(keyWord === '實收' && foundIndex > -1){
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '總計' && foundIndex > -1){
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '總額' && foundIndex > -1){
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '總數' && foundIndex > -1){
          const first = foundIndex - 1 > 0 ? foundIndex - 1 : 0;
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, first, last);
        }
        else if(keyWord === '付款方式' && foundIndex > -1){
          const last = foundIndex + 10 < splitText.length ? foundIndex + 10 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '已付金額' && foundIndex > -1){
          const last = foundIndex + 1 < splitText.length ? foundIndex + 1 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '訂單金額' && foundIndex > -1){
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '交易金額' && foundIndex > -1){
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '扣除金額' && foundIndex > -1){
          const last = foundIndex + 1 < splitText.length ? foundIndex + 1 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === 'Base' && foundIndex > -1){
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if((keyWord === 'MASTERCARD' || keyWord === 'MASTER') && foundIndex > -1){
          const first = foundIndex - 1 > 0 ? foundIndex - 1 : 0;
          const last = foundIndex + 1 < splitText.length ? foundIndex + 1 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, first, last);
        }
        else if(keyWord === 'VISA' && foundIndex > -1){
          const first = foundIndex - 2 > 0 ? foundIndex - 2 : 0;
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, first, last);
        }
        else if((keyWord === 'OCTOPUS' || keyWord === '八達通') && foundIndex > -1){
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === '支付寶' && foundIndex > -1){
          const first = foundIndex - 2 > 0 ? foundIndex - 2 : 0;
          const last = foundIndex + 2 < splitText.length ? foundIndex + 2 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, first, last);
        }
        else if(keyWord === '合計' && foundIndex > -1){
          const last = foundIndex + 1 < splitText.length ? foundIndex + 1 : splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, false, last);
        }
        else if(keyWord === 'total' && foundIndex > -1){
          const first = foundIndex - 1 > 0 ? foundIndex - 1 : 0;
          const last = splitText.length - 1;
          foundAmount = linearSearchAmount(foundIndex, splitText, first, last);
        }
        
        /*
        if(item.resultObject.nlpData.text.includes('SCO(S012003-08)')){
          console.log('index: ', foundIndex);
          console.log('splitText: ', splitText[foundIndex]);
          console.log('foundAmount: ', foundAmount);
          console.log('');
        }
        */
        if(foundAmount){
          ocrData[i].lookupSuggestionObject.amount = foundAmount;
        }
      }
    }
  }
}

/*
total ocr: 6152
by NLP: 3211
by Conditional Statements: 2941
amount matched by NLP: 2377
amount matched by Conditional Statements: 1680
amount matched: 4057
amount matched (%): 65.94603381014305
*/
getStatisticsData(ocrData, true, true);

/*
const splitText = item.resultObject.nlpData.text.split('\n');
let foundAmount = '';

for(let j = 0; j < splitText.length && !foundAmount; j += 1){
  const splitTextLowerCase = splitText[j].toLowerCase();

  if(splitTextLowerCase.includes('Amount')){
    const last = j + 1 < splitText.length ? j + 1 : splitText.length - 1;
    const indexToCheckDiscount = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
    const discount = linearSearchAmount(indexToCheckDiscount, splitText);
    foundAmount = linearSearchAmount(j, splitText, false, last);

    console.log('indexToCheckDiscount:', indexToCheckDiscount);
    console.log('discount:', discount);
    if(discount){
      foundAmount = foundAmount - discount;
    }
    
  }
  else if(
    splitTextLowerCase.includes('MASTERCARD'.toLowerCase()) ||
    splitTextLowerCase.includes('MASTER'.toLowerCase())
  ){
    const first = j - 1 > 0 ? j - 1 : 0;
    const last = j + 1 < splitText.length ? j + 1 : splitText.length - 1;
    foundAmount = linearSearchAmount(j, splitText, first, last);
  }
  else if(splitTextLowerCase.includes('VISA'.toLowerCase())){
    const first = j - 2 > 0 ? j - 2 : 0;
    const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
    foundAmount = linearSearchAmount(j, splitText, first, last);
  }
  else if(
    splitTextLowerCase.includes('OCTOPUS'.toLowerCase()) ||
    splitTextLowerCase.includes('八達通')
  ){
    const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
    foundAmount = linearSearchAmount(j, splitText, false, last);
  }
  else if(splitTextLowerCase.includes('支付寶')){
    const first = j - 2 > 0 ? j - 2 : 0;
    const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
    foundAmount = linearSearchAmount(j, splitText, first, last);
  }
  else if(splitTextLowerCase.includes('收款'.toLowerCase())){
    const first = j - 2 > 0 ? j - 2 : 0;
    const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
    foundAmount = linearSearchAmount(j, splitText, first, last);
  }
  else if(splitTextLowerCase.includes('實收'.toLowerCase())){
    const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
    foundAmount = linearSearchAmount(j, splitText, false, last);
  }
  else if(splitTextLowerCase.includes('總計'.toLowerCase())){
    if(splitTextLowerCase.length < 4){
      const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
      foundAmount = linearSearchAmount(j, splitText, false, last);
    }
  }
  else if(splitTextLowerCase.includes('總額'.toLowerCase())){
    if(splitTextLowerCase.length < 4){
      const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
      foundAmount = linearSearchAmount(j, splitText, false, last);
    }
  }
  else if(splitTextLowerCase.includes('總數'.toLowerCase())){
    if(splitTextLowerCase.length < 4){
      const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1;
      foundAmount = linearSearchAmount(j, splitText, false, last);
    }
  }
  else if(splitTextLowerCase.includes('付款方式'.toLowerCase())){
    const last = j + 10 < splitText.length ? j + 10 : splitText.length - 1; // test
    foundAmount = linearSearchAmount(j, splitText, false, last);
  }
  else if(splitTextLowerCase.includes('訂單金額'.toLowerCase())){
    const last = j + 10 < splitText.length ? j + 10 : splitText.length - 1; // test
    foundAmount = linearSearchAmount(j, splitText, false, last);
  }
  else if(splitTextLowerCase.includes('合計'.toLowerCase())){
    const last = j + 2 < splitText.length ? j + 2 : splitText.length - 1; // test
    foundAmount = linearSearchAmount(j, splitText, false, last);
  }
  else if(splitTextLowerCase.includes('total'.toLowerCase())){
    foundAmount = linearSearchAmount(j, splitText);
  }

  // if(item.resultObject.nlpData.text.includes('Customer Code : 8739***3') && item.resultObject.nlpData.text.includes('************5508') && item.resultObject.nlpData.text.includes('2021-11-04 10:43:52')){
  //   console.log('index: ', j);
  //   console.log('splitText: ', splitText[j]);
  //   console.log('foundAmount: ', foundAmount);
  //   console.log('');
  // }
  
  if(foundAmount){
    ocrData[i].lookupSuggestionObject.amount = foundAmount;
    ocrData[i].lookupSuggestionObject.amountBy = 'conditional statements';
  }

}
*/

