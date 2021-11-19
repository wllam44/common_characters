const moment = require('./node_modules/moment.js');

const case1 = {
  "body": {
  "s3Bucket": "hl-app-clientreceipts-uat",
  "s3FileKey": "upload/MN-0000000367/17c17b80-1f55-11ec-9f7e-cda176e1bc05.jpg",
  "nlpData": {
      "text": "Snownia\nNING\nIN FXPIRY 30/00\n1S/OVE AUTHE STAFF\nFOR INTAILS PLEASE CONTA\nECCOUNT\nThe\n0012072 100/\nKORNEILL\nKountill Plan Charts & Knif\nRond inntry hay honekone\nPlenue koop illa recolor ton chanart\ndecording to AEON Polly\nSales Receipt\nSHOP 001/307 REF 2017 TOT 06/0/0\nOPERATOR C5 15:02:17\n1 ( 030336466 1 3000.00 3000.00\nGALA WASHER OSMOGEK ($350\nDISC 5.0\n15.50\nTODAY 5\n12\n000053116\n0.10 0.10\nREE SCHEME CAW) 268\nO/IP\nJC 1 DAY 5*\nPromotion Sunary:\n0/1P\n-0.10\nROUNDING\n0.02\nJC 1-DAY 5%\n146.78\nPASSPORT NO. :000000 22180110181231\nMEMBER NO. :00103656203\nTOTAL\n2788.70\nSALES MEMO NO. 5460684\nHP NO 881719151960 (6)/SM 5460684 A\nDEPOSIT\n0.00\nBALANCE OWING 2788.70\n622493 *****4406\nCHANGE\n0.00\n* SUPPLIER DELIVERY (5460684) ***\nMEMBERSHIP YEAR UNTIL: 30/09/2022\nAVAILABLE POINT (UNTIL YESTERDAY):62\nTHIS MONTH GET (UNTIL 08/SEP):0\n(CAN BE USED FROM NEXT MONTH)\nPOINT EXPIRY DATE:30/09/2021\n(S) BRNABYR: 0120210920777801\nFOR DETAILS, PLEASE CONTACT OUR STAFF\nAT CUSTOMER SERVICE COUNTER.\nThank you please come again.\nThe receipt may fade out\nplease keep a photocopy if needed\n7 354\nTo\n",
      "entities": {
          "address": [
              {
                  "content": "SHOP 001/307",
                  "score": 0.7683983445167542,
                  "startOffset": "235",
                  "endOffset": "247"
              }
          ],
          "date": [
              {
                  "content": "REF 2017",
                  "score": 0.19142301380634308,
                  "startOffset": "248",
                  "endOffset": "256"
              },
              {
                  "content": "TOT 06",
                  "score": 0.5088079571723938,
                  "startOffset": "257",
                  "endOffset": "263"
              },
              {
                  "content": "0",
                  "score": 0.731837272644043,
                  "startOffset": "264",
                  "endOffset": "265"
              }
          ],
          "mall": [],
          "paymentMethod": [],
          "phone": [],
          "receiptNo": [],
          "shop": [],
          "totalPrice": [
              {
                  "content": "TOTAL\n2788.70",
                  "score": 0.721418023109436,
                  "startOffset": "552",
                  "endOffset": "565"
              }
          ]
      }
  }
}}

const case2 = {
  "body": {
  "s3Bucket": "hl-app-clientreceipts-uat",
  "s3FileKey": "upload/MN-0000000367/1ff11fe0-1f55-11ec-a51c-9b4461fe84c1.jpg",
  "nlpData": {
      "text": "AON\n康怡\n香港觀魚涌康山道2號康怡廣場(南)\n4:3884 6888\n請保留此設票,退依然款/退貨之用\n銷售發票\n| SHOP 001/167 REF 1677419 10/09/2021\nOPERATOR 6401509 | 09:01:32\n1 002052694 3@ 4.90 14. 70\n日本語\n12. 9/SP\n9 030297262\n7.90 7.90\n澳洲甘智 500G\n3 020130671\n24.90 34.90\n註意國畫\nI. DISC. $\n-3.00\n1 002366219\n5.50 11.00\n他查藥:So川\n9. 9/2P\n5 002645331\n8.50 17.00\n日本地APE下\nPromotion Summary:\n12. 9/SP\n-1.80\n9.9/2P\n-1.10\nMEMBER NO. : 10100203750\nTOTAL\n69.60\n20210910220014713514\nAlipay\n69.60\nCHANGE\n0.00\nBARC#0010001303109100902431677419\nRRNO#2021091022001471351436447303\n本會籍中度:310) 2013\n可用消分(截至口);200\n本月累積積分(至09月09日)15)\n(本月累積積分可於下月起使用)\n積分首次期2:30 06 2012\n有關積分詳情,歡向顧客服務臺人員查詢\n多謝惠顧,謝再光臨\n發票或會!色,如需要請自行取ED\nThe receipt may fade out.\nplease keep a photocopy if needed\n0011672109101677410\n",
      "entities": {
          "address": [
              {
                  "content": "SHOP 001/167",
                  "score": 0.76749187707901,
                  "startOffset": "61",
                  "endOffset": "73"
              }
          ],
          "date": [
              {
                  "content": "10/09/2021",
                  "score": 0.454130619764328,
                  "startOffset": "86",
                  "endOffset": "96"
              }
          ],
          "mall": [
              {
                  "content": "康怡廣場",
                  "score": 0.7613248825073242,
                  "startOffset": "17",
                  "endOffset": "21"
              }
          ],
          "paymentMethod": [],
          "phone": [
              {
                  "content": "6888",
                  "score": 0.6059098839759827,
                  "startOffset": "32",
                  "endOffset": "36"
              }
          ],
          "receiptNo": [
              {
                  "content": "REF 1677419",
                  "score": 0.4436497390270233,
                  "startOffset": "74",
                  "endOffset": "85"
              }
          ],
          "shop": [
              {
                  "content": "AON",
                  "score": 0.5829917192459106,
                  "startOffset": "0",
                  "endOffset": "3"
              }
          ],
          "totalPrice": [
              {
                  "content": "TOTAL\n69.60",
                  "score": 0.7269881367683411,
                  "startOffset": "385",
                  "endOffset": "396"
              }
          ]
      }
  }
}}

const case3 = {
  "body": {
  "s3Bucket": "hl-app-clientreceipts-uat",
  "s3FileKey": "upload/MN-0000000367/281615e0-1f55-11ec-b8de-0f042111f984.jpg",
  "nlpData": {
      "text": "EON\n康怡\n香港側魚涌康山道2號康怡賣(南)\n電話:28846888\n請保留此致果,按退換條款作出货之用\n銷售發票\nSHOP 001/123 REF 1233648 09/09/2021\nOPERATOR 6301543\n1 020299814 10\n土耳其無花果禮盒 700G\n15:09:56\n79.00\n79.00\nMEMBER NO. :02700261759\nTOTAL\n79.00\nOCTOPUS\n79.00\n八達通付款\n接號:\n40BDE9\n八達通號碼:\n89644258\n扣除金額:\n$79.00\n餘額:\n$141.60\n交易時間 2021-09-09 15:10:08\n上一次於 2021-09-09 自動增值\nCHANGE\n0.00\n本會籍年度至31/12/2021\n可用積分(截至昨日);2966\n本月累積積分(至09月08日)0\n(本月累不責積分可於下月起使用)\n積分有效期至:31/01/2022\n有關積分詳情,歡迎向顧客服務臺人員查詢\n多謝惠顧,請再光臨\n發票或會退色,如有需要敬請自行影印\nThe receipt may fade out,\nplease keep a photocopy if needed\n0011232100091233648\n",
      "entities": {
          "address": [
              {
                  "content": "SHOP 001/123",
                  "score": 0.7763627171516418,
                  "startOffset": "59",
                  "endOffset": "71"
              }
          ],
          "date": [
              {
                  "content": "09/09/2021",
                  "score": 0.43446433544158936,
                  "startOffset": "84",
                  "endOffset": "94"
              }
          ],
          "mall": [],
          "paymentMethod": [
              {
                  "content": "八達通付款",
                  "score": 0.8140816688537598,
                  "startOffset": "212",
                  "endOffset": "217"
              }
          ],
          "phone": [
              {
                  "content": "電話:28846888",
                  "score": 0.6649912595748901,
                  "startOffset": "24",
                  "endOffset": "35"
              }
          ],
          "receiptNo": [],
          "shop": [
              {
                  "content": "EON",
                  "score": 0.5724592804908752,
                  "startOffset": "0",
                  "endOffset": "3"
              }
          ],
          "totalPrice": []
      }
  }
}}

const case4 = {
  "body": {
  "s3Bucket": "hl-app-clientreceipts-uat",
  "s3FileKey": "upload/MN-0000000367/31285210-1f55-11ec-aeb8-afbb02ebfd0f.jpg",
  "nlpData": {
      "text": "EON\n康怡\n香港側魚涌康山道2绒康伯商場(南)\n官話:2884 6888\n請保留此段興,按退换條款作成之用\n銷售發票\nSHOP 001/301 REF 3017970 08/09/2021\nOPERATOR 6401012\n16:14:22\n5699.00\nSHOP 0 )\nOPERAT\n1 030244842\n1@ 5699.00\nHH-133636 W *\nIP/-10%\n0, DISC, 53\n1\n030\n0.\nPromotion Summary:\n1P/-10%\n0. DISC.5%\nROUNDING\n-569.90\n-256. 46\n-0.04\nPromot\n0. DISC\nROUNDI\nSTAFF SALE TO 1706092\nSTAFF\nSALES\nTOTAL\n4872.60\nSALES MEMO NO.5285611\n0102008908439 COUPON\n500.00\n*********5500 070495 4372.60\nJSVISA\n**** C\nTID 71964902\nTRACE #008348\nCHANGE\n0.00\nJSVISA\nTID 7196\nSTAFF SALE TO 1706092\n*** SUPPLIER DELIVERY (5285611) ****\nSTAF\n+-+-+-+-+-+\n一十十十十\n+\n恐或贖(即\n| |\n--+\n+\n$20現金券\n+-+-+-+ tttttttttt\n憑此發票於AEON、AEON STYLE\nEXAEON SUPERMARKET\n購物滿$200或以上\n(AEON收銀機印折實單一發票計算),\n即可作$20現金券使用。\n可使用發票現金券之有效日期:\n2021年9月11日至9月26日\n(只適用於星期六及日)\n*每張發票只可使用一張現金券\n* 現金券不適用於自助付款快線\n及部份商品和特許銷售商\n*優惠須受有關條款及細則約束,\n詳情請懿閱海報或與店內職員聯絡。\n20\n多謝惠顧,請再光臨\n發票或會退色,如有意要敬請自行影印\nThe receipt may fade out,\nplease keep a photocopy if needed\n0013012109083017070\n",
      "entities": {
          "address": [
              {
                  "content": "SHOP 001/301",
                  "score": 0.6239700317382812,
                  "startOffset": "60",
                  "endOffset": "72"
              }
          ],
          "date": [],
          "mall": [
              {
                  "content": "康伯商場",
                  "score": 0.7410815954208374,
                  "startOffset": "17",
                  "endOffset": "21"
              }
          ],
          "paymentMethod": [],
          "phone": [
              {
                  "content": "2884 6888",
                  "score": 0.6044881939888,
                  "startOffset": "28",
                  "endOffset": "37"
              }
          ],
          "receiptNo": [],
          "shop": [
              {
                  "content": "EON",
                  "score": 0.56048983335495,
                  "startOffset": "0",
                  "endOffset": "3"
              }
          ],
          "totalPrice": [
              {
                  "content": "TOTAL\n4872.60",
                  "score": 0.6931596398353577,
                  "startOffset": "338",
                  "endOffset": "351"
              }
          ]
      }
  }
}}


const getTenatName = (res) => {
  return res.body.nlpData.entities.address.length > 0? res.body.nlpData.entities.address[0].content: null; 
}

const getDate = (res, tenantName) => {
  const splitData = res.body.nlpData.text.split('\n');
  let rowForDate = '', result = '';

  for(data of splitData){
    if(data.includes(tenantName)){
      rowForDate = data;
      break;
    }
  }

  if(rowForDate){
    result = rowForDate.substring(rowForDate.length - 10, rowForDate.length);
  }
  return result;
}

const getTime = (res) => {
  const splitData = res.body.nlpData.text.split('\n');
  let result = '';

  for(data of splitData){
    const foundTime = data.match(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/g);
    if(foundTime){
      result = foundTime[0];
      break;
    }
  }

  return result;
}

const getResult = (date, time) => {
  const dateStr = date + time;
  let result = '';
  try{
    result = moment.utc(dateStr, 'DD/MM/YYYY HH:mm:ss').format();
  }catch(err){
    console.log(err);
  }
  return result;
}

console.log(case4.body.nlpData.text.split('\n'));

const case1Tenant = getTenatName(case1);
const case2Tenant = getTenatName(case2);
const case3Tenant = getTenatName(case3);
const case4Tenant = getTenatName(case4);

console.log('<!--Teant Name-->');
console.log(case1Tenant);
console.log(case2Tenant);
console.log(case3Tenant);
console.log(case4Tenant);
console.log('<!--Teant Name-->');
console.log('');


const case1Date = getDate(case1, case1Tenant);
const case2Date = getDate(case2, case2Tenant);
const case3Date = getDate(case3, case3Tenant);
const case4Date = getDate(case4, case4Tenant);

console.log('<!--Date-->');
console.log(case1Date);
console.log(case2Date);
console.log(case3Date);
console.log(case4Date);
console.log('<!--Date-->');
console.log('');

const case1Time = getTime(case1);
const case2Time = getTime(case2);
const case3Time = getTime(case3);
const case4Time = getTime(case4);

console.log('<!--Time-->');
console.log(case1Time);
console.log(case2Time);
console.log(case3Time);
console.log(case4Time);
console.log('<!--Time-->');
console.log('');


const case1Res = getResult(case1Date, case1Time);
const case2Res = getResult(case2Date, case2Time);
const case3Res = getResult(case3Date, case3Time);
const case4Res = getResult(case4Date, case4Time);

console.log('<!--Result-->');
console.log(case1Res);
console.log(case2Res);
console.log(case3Res);
console.log(case4Res);
console.log('<!--Result-->');
console.log('');

let dateFormat = '', result = '';
let testDate = '09/09/2020', time = '12:00:00';
const checkDate1 = moment(testDate, "DD-MM-YYYY HH:mm:ss").diff(new Date(), 'days');
const checkDate2 =  moment(testDate, "MM-DD-YYYY HH:mm:ss").diff(new Date(), 'days');

console.log(checkDate1);
console.log(checkDate2);

if(checkDate1 >= -30 && checkDate1 <= 0){
  dateFormat = 'DD-MM-YYYY HH:mm:ss';
}
else if(checkDate2 >= -30 && checkDate2 <= 0){
  dateFormat = 'MM-DD-YYYY HH:mm:ss';
}

if(!dateFormat && !checkDate1 && !checkDate2 && testDate.length > 7){
  dateFormat = 'YYYY-MM-DD HH:mm:ss';
}
else if(!dateFormat && !checkDate1){
  dateFormat = 'MM-DD-YYYY HH:mm:ss';
}
else if(!dateFormat && !checkDate2){
  dateFormat = 'DD-MM-YYYY HH:mm:ss';
}
else{
  dateFormat = 'DD-MM-YYYY HH:mm:ss';
}

if(!dateFormat){
  return null;
}

const getNewTime = (dateSource) => {
  const foundTime = dateSource.match(/(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]/g);
  if (foundTime) {
    return foundTime[0];
  }
  return '12:00:00';
};

/*
let utcDate = '', result = '';
try{
  utcDate = moment(testDate, dateFormat).utc().format('YYYY-MM-DD HH:mm:ssZ');
}
catch(err){
  //console.err(err);
}

if(utcDate && utcDate !== 'Invalid date') {
  //const utcDate = moment(testDate, dateFormat).utc().format('YYYY-MM-DD HH:mm:ssZ');
  result = moment.utc(utcDate);
}
else{
  result = '';
}
*/


const toLocalDate = (dateSource, dateFormat) => {
  return moment(dateSource).local().format(dateFormat);
}

//let dateSource = '2021/09/03';
//let timeSource = '12:00:00';
let dateStr = '2021-09-03T15:59:59';
let localDateStr = '';
//let localDateStr = '2021-09-02T16:00:00';
/*
let resultObjectDate = moment(dateSource + timeSource, 'YYYY-MM-DD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss');
resultObjectDate = moment.utc(resultObjectDate).format('YYYY-MM-DD HH:mm:ss');

let localDateStr = '2021-09-02T16:00:00';
let localDateSource = '2021/09/03';
let localTimeSource = '12:00:00';

let resultObjectDate = moment(localDateSource + localTimeSource, 'YYYY-MM-DD HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss');
resultObjectDate = moment.utc(resultObjectDate).format('YYYY-MM-DD HH:mm:ss');
*/


/*
console.log('resultObjectDate: ', resultObjectDate);
console.log('resultObjectDate to local: ', toLocalDate(moment.utc(resultObjectDate).toDate(), 'YYYY-MM-DD HH:mm:ss'));

console.log('submitObjectDate: ', submitObjectDate);
*/

//const diff = moment(toLocalDate(moment.utc(resultObjectDate).toDate(), 'YYYY-MM-DD HH:mm'), 'YYYY-MM-DD HH:mm:ss').diff(submitObjectDate, 'days');
const diff = moment(dateStr, 'YYYY-MM-DDTHH:mm:ss').diff(localDateStr, 'days');

if(diff === 0){
  console.log('within 1 day');
}
else if(diff < 0){
  console.log('submitObjectDate is larger than resultObjectDate');
}
else {
  console.log('submitObjectDate is small than resultObjectDate');
}




