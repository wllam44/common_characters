const stringSimilarity = require("./node_modules/string-similarity");
/*
const text = "EON\n康怡5\n香港鯛魚涌康山山自2號康怡場(南)\n電話:2884 6888\n請保留發票,按退換條款作战之用\n銷售發票\nSHOP 001/126 REF 1267382 20/09/2021\nOPERATOR 1507342 13:09:09\n46. 70\n46.70\n1 000878389 16\n鲜頻骨折鮮墨魚骨\n2002 129609\n去換點英新片\n3 00015 1373\n10. 20\n93. 90\n23.90\nT. DISC. 34\nPromotion Summary:\n1. DISC, 3%\nROUNDING\n0.08\nTOTAL\n110.60\nOCTOPUS\n110.60\n達通付款\n4OBDOG\n其违:\n87153443\n金額:\n$110.60\n。\n$160.40\n交易時間 900\n於2009-20 現金增值\nCHANGE\n0.00\n多謝惠顧,請再光臨\n算票或會用色,如有需要做自行\nThe receipt may fade out.\nplease keep a photocony if\n"
*/

const text = "Q\n三.\n萬寧 mannings\n2786.00\n14 X 199.00\nmassa CS-4 60\n2C\n14 件 $2268.00\n-518.00\n供應商優惠券\n合十)\n2268,00\n- 1800.00\n468.00\n468.00\n八達通付款\n食材:241.30\n上一次於 2021-09-17 現金增值\n八達通卡&th: 49046556\n成;404D ID\n客戶如上述的八達通交易有何查句,請保存此\n存根及歌童八達通州頁客服将浓内:京2266 2222\nyuu ID: : 934480000767046\n截至上單交易積分吉余:5566\n登入 yuu 應用程式取更多優惠及查者最新\n憑單可享14天購物退/換保障(高中禮券除外)\n詳情請客的每報或國中站,\n盡享所有yuu 著數,立即描二維或使用連結下\n車Kyuu應用程式隨時查看積分及其他專禮遇\n回回\nyuurewards.com/download\n淘大商場(4392) 電話:23313357 #08\n";

let tenantNames = [
  {
    "name": {
       "en": "Q Pets",
       "tc": "Q Pets",
       "sc": "Q Pets"
    }
 },
  {
    "name": {
       "en": "CS-Models",
       "tc": "CS-Models",
       "sc": "CS-Models"
    }
 },
  {
    "name": {
       "en": "X-Focus",
       "tc": "X-Focus",
       "sc": "X-Focus"
    }
 },
  {
    "name": {
       "en": "Mannings Plus (Grand Plaza)",
       "tc": "Mannings Plus (雅蘭中心)",
       "sc": "Mannings Plus (雅兰中心)"
    }
 },
  {
    "name": {
       "en": "testing dining Q",
       "tc": "testing dining Q",
       "sc": "testing dining Q"
    }
 },
  {
    "name": {
       "en": "TASTE x FRESH",
       "tc": "TASTE x FRESH新鮮生活",
       "sc": "TASTE x FRESH新鲜生活"
    }
 },
  {
    "name": {
       "en": "Mannings Plus (Grand Plaza)",
       "tc": "Mannings Plus (雅蘭中心)",
       "sc": "Mannings Plus (雅兰中心)"
    }
 },
  {
    "name": {
       "en": "TASTE x FRESH",
       "tc": "TASTE x FRESH新鮮生活",
       "sc": "TASTE x FRESH新鲜生活"
    }
 },
  {
    "name": {
       "en": "Mannings",
       "tc": "萬寧",
       "sc": "万宁"
    }
 },
  {
    "name": {
       "en": "Mannings",
       "tc": "萬寧",
       "sc": "万宁"
    }
 },
  {
    "name": {
       "en": "Ming Fruit Shop (Amoy Plaza)",
       "tc": "名果店 (淘大商場)",
       "sc": "名果店 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Sa Sa (Amoy Plaza)",
       "tc": "莎莎 (淘大商場)",
       "sc": "莎莎 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Marugame Seimen (Amoy Plaza)",
       "tc": "丸龜製麵 (淘大商場)",
       "sc": "丸龟制面 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Lock Health (Amoy Plaza)",
       "tc": "鎖健 (淘大商場) ",
       "sc": "锁健 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "McDonald's (Amoy Plaza)",
       "tc": "麥當勞 (淘大商場)",
       "sc": "麦当劳 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Men Wah Bing Teng (Amoy Plaza)",
       "tc": "敏華冰廳 (淘大商場)",
       "sc": "敏华冰厅 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Baleno (Amoy Plaza)",
       "tc": "Baleno (淘大商場)",
       "sc": "Baleno (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Eu Yan Sang (Amoy Plaza)",
       "tc": "余仁生 (淘大商場)",
       "sc": "余仁生 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Manna Organic Station (Amoy Plaza)",
       "tc": "嗎哪有機站 (淘大商場)",
       "sc": "吗哪有机站 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Beijing Tong Ren Tang (Amoy Plaza)",
       "tc": "北京同仁堂 (淘大商場)",
       "sc": "北京同仁堂 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Tai Hing (Amoy Plaza)",
       "tc": "太興 (淘大商場)",
       "sc": "太興 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Hung Fook Tong (Amoy Plaza)",
       "tc": "鴻福堂 (淘大商場)",
       "sc": "鸿福堂 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Modern Bachelor Education Centre (Amoy Plaza)",
       "tc": "現代小學士教育中心(淘大商場)",
       "sc": "现代小学士教育中心(淘大商场)"
    }
 },
  {
    "name": {
       "en": "OPTICAL 88 (Amoy Plaza)",
       "tc": "眼鏡88 (淘大商場)",
       "sc": "眼镜88 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "MINISO (Amoy Plaza)",
       "tc": "名創優品 (淘大商場)",
       "sc": "名创优品 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Meka (Amoy Plaza)",
       "tc": "美康 (淘大商場)",
       "sc": "美康 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "CR Care (Amoy Plaza)",
       "tc": "華潤堂 (淘大商場)",
       "sc": "华润堂 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "DR. KONG (Amoy Plaza)",
       "tc": "DR. KONG (淘大商場)",
       "sc": "DR. KONG (淘大商场)"
    }
 },
  {
    "name": {
       "en": "YVES ROCHER (Amoy Plaza)",
       "tc": "YVES ROCHER (淘大商場)",
       "sc": "YVES ROCHER (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Hecom / SEAHORSE (Amoy Plaza)",
       "tc": "軒琴居 / 海馬牌 (淘大商場)",
       "sc": "轩琴居 / 海马牌 (淘大商场)"
    }
 },
  {
    "name": {
       "en": "Watami (Amoy Plaza)",
       "tc": "居食屋「和民」(淘大商場)",
       "sc": "居食屋「和民」(淘大商场)"
    }
 }
];

tenantNames = tenantNames.map((item, i) => { return {...item, id: i} });

let splitText = [];

for (let tenantName of tenantNames) {
  splitText.push(tenantName.name.en);
  splitText.push(tenantName.name.tc);
  splitText.push(tenantName.name.sc);
}

const bestMatch = stringSimilarity.findBestMatch(
  text,
  splitText,
);

const bestMatchIndex = bestMatch.bestMatchIndex;

console.log(bestMatch);
console.log('bestMatchIndex: ', bestMatchIndex);
console.log('result: ', tenantNames[Math.floor((bestMatchIndex / splitText.length) * tenantNames.length)]);

/*
const similarity = stringSimilarity.compareTwoStrings(text, "康怡");
console.log(similarity);
*/

/*
const splitText = text.split('\n');

const bestMatch = stringSimilarity.findBestMatch(
  '康怡',
  splitText,
);

console.log(bestMatch);
*/
