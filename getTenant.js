let ocrData = require('./data/OCR_prod_data_1');
let tenantData = require('./data/tenant_data');
const stringSimilarity = require("./node_modules/string-similarity");

const getStatisticsData = (ocrData, displayText, displayDetails) => {
  let totalOCR = 0;
  let tenantMatched = 0;
  let isPaymentSlipCount = 0;
  let byNLP = 0;
  let byCondStatement = 0;
  let tenantMatchedByNLP = 0;
  let tenantMatchedByCondStatement = 0;

  for(var i=0; i<ocrData.length; i++){
    const item = ocrData[i];

    if(item.isPaymentSlip){
      isPaymentSlipCount++;
    }

    if(item.lookupSuggestionObject && item.submitObject){
      totalOCR++;

      if(item.lookupSuggestionObject.tenantId && item.submitObject.tenantId){
        const isTenantMatched = item.lookupSuggestionObject.tenantId === item.submitObject.tenantId;

        if(isTenantMatched){
          tenantMatched++;
        }
        else{
          if(displayText && item.lookupSuggestionObject.amountBy !== 'nlp'){
            console.log('lookupSuggestionObject.tenantBy:', item.lookupSuggestionObject.tenantBy);
            if(item.lookupSuggestionObject.tenantBestMatch){
              console.log('lookupSuggestionObject.tenantBestMatch:', item.lookupSuggestionObject.tenantBestMatch);
            }
            console.log('lookupSuggestionObject.tenantId:', item.lookupSuggestionObject.tenantId);
            console.log('submitObject.tenantId:', item.submitObject.tenantId);
            console.log('ocr.text:', item.resultObject.nlpData.text);
            console.log('');
          }
        }

        if(item.lookupSuggestionObject.tenantBy && item.lookupSuggestionObject.tenantBy.includes('nlp')){
          byNLP++;
          if(isTenantMatched){
            tenantMatchedByNLP++;
          }
        }
        else if(item.lookupSuggestionObject.tenantBy && item.lookupSuggestionObject.tenantBy.includes('conditional statements')){
          byCondStatement++;
          if(isTenantMatched){
            tenantMatchedByCondStatement++;
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
    console.log('amount matched by NLP:', tenantMatchedByNLP);
    console.log('amount matched by Conditional Statements:', tenantMatchedByCondStatement);
  }
  console.log('amount matched:', tenantMatched);
  console.log('amount matched (%):', tenantMatched / totalOCR * 100);
  console.log('');
}

const getTenantByPhoneNumber = (phoneTest, mallId) => {
  let getTenantParams = '';
  let tenantId = '';

  if (phoneTest.length > 5) {
    const testCase1 = phoneTest.toLowerCase();
    const testCase2 = testCase1.slice(0, 4) + testCase1.slice(4);
    const testCase3 = testCase1.slice(0, -4) + testCase1.slice(-4);
    const testCase4 = testCase1.slice(0, testCase1.length / 2) + testCase1.slice(testCase1.length / 2);

    if (!mallId) {
      getTenantParams = tenantData.find((tenant) => {
        if(!tenant.isHidden && tenant.loyaltyInclude){
          if(tenant.phone.replace(/\s/g, '').includes(testCase1)){
            return tenant;
          }
          if(tenant.phone.replace(/\s/g, '').includes(testCase2)){
            return tenant;
          }
          if(tenant.phone.replace(/\s/g, '').includes(testCase3)){
            return tenant;
          }
          if(tenant.phone.replace(/\s/g, '').includes(testCase4)){
            return tenant;
          }
          return null;
        }
        return null;
      })
    } else {
      getTenantParams = tenantData.find((tenant) => {
        if(!tenant.isHidden && tenant.loyaltyInclude && tenant.mall === mallId){
          if(tenant.phone.replace(/\s/g, '').includes(testCase1)){
            return tenant;
          }
          if(tenant.phone.replace(/\s/g, '').includes(testCase2)){
            return tenant;
          }
          if(tenant.phone.replace(/\s/g, '').includes(testCase3)){
            return tenant;
          }
          if(tenant.phone.replace(/\s/g, '').includes(testCase4)){
            return tenant;
          }
          return null;
        }
        return null;
      })
    }
    if (getTenantParams) {
      tenantId = getTenantParams.id;
      // score = stringSimilarity.compareTwoStrings(receiptOCRresult.resultObject.nlpData.text, phoneTest.toString());
    }
  }
  return tenantId;
}

const getTenantByShop = (shopTest, mallId) => {
  let getTenantParams = '';
  let tenantId = '';

  if(shopTest && shopTest === 'EON'){
    shopTest = 'AEON';
  }

  shopTest = shopTest.toLowerCase();

  if(!mallId){
    getTenantParams = tenantData.find((tenant) => {
      if(!tenant.isHidden && tenant.loyaltyInclude){
        if(tenant.name.en.includes(shopTest) || tenant.name.tc.includes(shopTest) || tenant.name.sc.includes(shopTest)){
          return tenant;
        }
        return null;
      }
      return null;
    })
  } else {
    getTenantParams = tenantData.find((tenant) => {
      if(!tenant.isHidden && tenant.loyaltyInclude && tenant.mall === mallId){
        if(tenant.name.en.includes(shopTest) || tenant.name.tc.includes(shopTest) || tenant.name.sc.includes(shopTest)){
          return tenant;
        }
        return null;
      }
      return null;
    })
  }

  if (getTenantParams) {
    tenantId = getTenantParams.id;
    // score = stringSimilarity.compareTwoStrings(receiptOCRresult.resultObject.nlpData.text, phoneTest.toString());
  }

  return tenantId;
}

const methodIsIncludes = (tenants, str, revisedStr, chiCharInStr) => {
  let getTenantParams = '';
  let tenantId = '';
  let score = '';
  let bestMatch = '';

  for (let x = 0; x < tenants.length && !getTenantParams; x += 1) {
    const tenant = tenants[x];
    const tenantNameEn = tenant.name.en.toLowerCase();
    const tenantNameTc = tenant.name.tc.toLowerCase();
    const tenantNameSc = tenant.name.sc.toLowerCase();

    if (revisedStr && tenantNameEn.includes(revisedStr)) {
      getTenantParams = tenant;
      tenantId = getTenantParams.id;
      score = Math.random();
      bestMatch = { target: {en: tenantNameEn, tc: tenantNameTc, sc: tenantNameSc}, rating: score, source: str, sourceRevised: revisedStr, chiCharInStr: chiCharInStr };
    }
    if (chiCharInStr && tenantNameTc.includes(chiCharInStr)) {
      getTenantParams = tenant;
      tenantId = getTenantParams.id;
      score = Math.random();
      bestMatch = { target: {en: tenantNameEn, tc: tenantNameTc, sc: tenantNameSc}, rating: score, source: str, sourceRevised: revisedStr, chiCharInStr: chiCharInStr };
    }
    if (chiCharInStr && tenantNameSc.includes(chiCharInStr)) {
      getTenantParams = tenant;
      tenantId = getTenantParams.id;
      score = Math.random();
      bestMatch = { target: {en: tenantNameEn, tc: tenantNameTc, sc: tenantNameSc}, rating: score, source: str, sourceRevised: revisedStr, chiCharInStr: chiCharInStr };
    }
  }
  return [getTenantParams, tenantId, score, bestMatch];
}

const methodHighestScore = (tenants, str, revisedStr, chiCharInStr) => {
  let getTenantParams = '';
  let tenantId = '';
  let score = '';
  let bestMatch = '';
  let bestScore = '';

  for (let x = 0; x < tenants.length; x += 1) {
    const tenant = tenants[x];
    const tenantNameEn = tenant.name.en.toLowerCase();
    const tenantNameTc = tenant.name.tc.toLowerCase();
    const tenantNameSc = tenant.name.sc.toLowerCase();

    if (revisedStr) {
      const similarityEn = stringSimilarity.compareTwoStrings(
        revisedStr,
        tenantNameEn,
      );

      if (similarityEn > bestScore) {
        getTenantParams = tenant;
        tenantId = getTenantParams.id;
        score = similarityEn;
        bestMatch = { target: {en: tenantNameEn, tc: tenantNameTc, sc: tenantNameSc}, rating: score, source: str, sourceRevised: revisedStr, chiCharInStr: chiCharInStr };
        bestScore = similarityEn;
      }
    }
    if (chiCharInStr) {
      const similarityTc = stringSimilarity.compareTwoStrings(
        chiCharInStr,
        tenantNameTc,
      );

      if (similarityTc > bestScore) {
        getTenantParams = tenant;
        tenantId = getTenantParams.id;
        score = similarityTc;
        bestMatch = { target: {en: tenantNameEn, tc: tenantNameTc, sc: tenantNameSc}, rating: score, source: str, sourceRevised: revisedStr, chiCharInStr: chiCharInStr };
        bestScore = similarityTc;
      }

      const similaritySc = stringSimilarity.compareTwoStrings(
        chiCharInStr,
        tenantNameSc,
      );

      if (similaritySc > bestScore) {
        getTenantParams = tenant;
        tenantId = getTenantParams.id;
        score = similaritySc;
        bestMatch = { target: {en: tenantNameEn, tc: tenantNameTc, sc: tenantNameSc}, rating: score, source: str, sourceRevised: revisedStr, chiCharInStr: chiCharInStr };
        bestScore = similaritySc;
      }
    }
  }
  return [getTenantParams, tenantId, score, bestMatch];
}

const textSearchTenant = (text, mallId) => {
  let getTenantParams = '';
  let tenants = [];
  let tenantNames = [];
  let tenantId = '';
  let score = '';
  let tenantFoundBy = '';
  let bestMatch = '';

  if(!mallId){
    tenants = tenantData.filter((tenant) => {
      if(!tenant.isHidden && tenant.loyaltyInclude){
        return true;
      }
      return false;
    });
  } else {
    tenants = tenantData.filter((tenant) => {
      if(!tenant.isHidden && tenant.loyaltyInclude && tenant.mall === mallId){
        return true;
      }
      return false;
    });
  }

  for (let j = 0; j < tenants.length; j += 1) {
    tenantNames.push(tenants[j].name.en.toLowerCase());
    tenantNames.push(tenants[j].name.tc.toLowerCase());
    tenantNames.push(tenants[j].name.sc.toLowerCase());
  }

  /*
  const similarity = stringSimilarity.findBestMatch(
    text,
    tenantNames,
  );

  if (similarity) {
    getTenantParams = tenants[Math.floor((similarity.bestMatchIndex / tenantNames.length) * tenants.length)];
  }

  if (getTenantParams) {
    tenantFoundBy = 'textSearch';
    tenantId = getTenantParams.id;
    score = similarity.bestMatch.rating;
  }
  */

  const splitText = text.split('\n');
  let bestScore = -1;

  for(let k = 0; k < splitText.length && k <= 10; k += 1) {
    const str = splitText[k];

    if (str){
      //const revisedStr = str.toLowerCase().replace(/\$\d+(?:\.\d+)?/, '').replace(/hkd\d+(?:\.\d+)?/, '').replace(/[\d#$%^&*().,!:''-=]+/g, ''); // for methodIsIncludes
      const revisedStr = str.toLowerCase().replace(/\$\d+(?:\.\d+)?/, '').replace(/hkd\d+(?:\.\d+)?/, '');

      let chiCharInStr = '';
      let z = 0;
      let tempTenant = '';
      let tempTenantId = '';
      let tempScore = '';
      let tempBestMatch = '';

      while (z < revisedStr.length) {
        if(revisedStr[z].match(/[\u3400-\u9FFF]/)) {
          chiCharInStr += revisedStr[z];
        }
        z += 1;
      }

      // [getTenantParams, tenantId, score, bestMatch] = methodIsIncludes(tenants, str, revisedStr, chiCharInStr);

      // [tempTenant, tempTenantId, tempScore, tempBestMatch] = methodHighestScore(tenants, str, revisedStr, chiCharInStr);

      // if (tempScore > bestScore) {
      //   bestScore = tempScore;
      //   getTenantParams = tempTenant;
      //   tenantId = tempTenantId;
      //   bestMatch = tempBestMatch;
      // }

      const similarity = stringSimilarity.findBestMatch(
        revisedStr,
        tenantNames,
      );
  
      if (similarity) {
        if (similarity.bestMatch.rating > bestScore) {
          bestScore = similarity.bestMatch.rating;
          getTenantParams = tenants[Math.floor((similarity.bestMatchIndex / tenantNames.length) * tenants.length)];
  
          if (getTenantParams) {
            tenantFoundBy = 'textSearch';
            tenantId = getTenantParams.id;
            score = bestScore;
            bestMatch = similarity.bestMatch;
            bestMatch.source = splitText[k];
            bestMatch.sourceRevised = revisedStr;
          }
        }
      }

    }
  }

  return [tenantId, score, tenantFoundBy, bestMatch];
}

for(var i=0; i<ocrData.length; i++){
  console.log(`loading: ${i}/${ocrData.length}`);
  const item = ocrData[i];
  let foundTenant = '';
  if(item.resultObject){

    if(item.resultObject.nlpData.entities){

      if(item.resultObject.nlpData.entities.phone){
        ocrData[i].lookupSuggestionObject.tenantBy = 'nlp';

        for (let j = 0; j < item.resultObject.nlpData.entities.phone.length && !foundTenant; j += 1) {
          let phoneTest = item.resultObject.nlpData.entities.phone[j].content.replace(/\D/g, '');

          if (phoneTest.startsWith('852')) {
            phoneTest = phoneTest.replace('852', '');
          }

          foundTenant = getTenantByPhoneNumber(phoneTest, ocrData[i].lookupSuggestionObject ? ocrData[i].lookupSuggestionObject.mallId: '');
  
          if (foundTenant) {
            ocrData[i].lookupSuggestionObject.tenantId = foundTenant;
          }
        }
      }

      if(!foundTenant && item.resultObject.nlpData.entities.shop){
        ocrData[i].lookupSuggestionObject.tenantBy = 'nlp';

        for (let k = 0; k < item.resultObject.nlpData.entities.shop.length && !foundTenant; k += 1) {
          const shopTest = item.resultObject.nlpData.entities.shop[k].content;

          foundTenant = getTenantByShop(shopTest, ocrData[i].lookupSuggestionObject ? ocrData[i].lookupSuggestionObject.mallId: '');
          
  
          if (foundTenant) {
            ocrData[i].lookupSuggestionObject.tenantId = foundTenant;
          }
        }
      }
    }
    if(!foundTenant && item.resultObject.nlpData.text){
      ocrData[i].lookupSuggestionObject.tenantBy = 'conditional statements-phone';

      const splitText = item.resultObject.nlpData.text.split('\n');

      for (let j = 0; j < splitText.length && !foundTenant; j += 1) {
        const text = splitText[j];
  
        if (text) {
          const textToLowerCase = text.toLowerCase();
          if (textToLowerCase.includes('tel') || textToLowerCase.includes('電話') || textToLowerCase.includes('號') || textToLowerCase.startsWith('852')) {
            let phoneTest = text.replace(/\D/g, '');
  
            if (phoneTest.startsWith('852')) {
              phoneTest = phoneTest.replace('852', '');
            }

            foundTenant = getTenantByPhoneNumber(phoneTest, ocrData[i].lookupSuggestionObject ? ocrData[i].lookupSuggestionObject.mallId: '');
          }
        }
      }

      if(foundTenant){
        ocrData[i].lookupSuggestionObject.tenantId = foundTenant;
      }
    }
    if(!foundTenant && item.resultObject.nlpData.text) {
      ocrData[i].lookupSuggestionObject.tenantBy = 'conditional statements-text';

      let temapScore, tempTenantBy, bestMatch;
      [foundTenant, temapScore, tempTenantBy, bestMatch] = textSearchTenant(item.resultObject.nlpData.text, ocrData[i].lookupSuggestionObject ? ocrData[i].lookupSuggestionObject.mallId: '');

      if(foundTenant){
        ocrData[i].lookupSuggestionObject.tenantId = foundTenant;
        ocrData[i].lookupSuggestionObject.tenantBestMatch = bestMatch;
      }
    }
  }
}


/*
// Find tenant - nlp data with phone number and shop name //
total ocr: 6152
by NLP: 3204
by Conditional Statements: 0
amount matched by NLP: 2781
amount matched by Conditional Statements: 0
amount matched: 2781
amount matched (%): 45.20481144343303
*/


/*
// the last method
total ocr: 6152
by NLP: 2637
by Conditional Statements: 3515
amount matched by NLP: 2466
amount matched by Conditional Statements: 1615
amount matched: 4081
amount matched (%): 66.33615084525357
*/

/*
// methodHighestScore
total ocr: 6152
by NLP: 2637
by Conditional Statements: 3511
amount matched by NLP: 2466
amount matched by Conditional Statements: 1543
amount matched: 4009
amount matched (%): 65.16579973992198
*/


getStatisticsData(ocrData, true, true);

