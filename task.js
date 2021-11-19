const { diceCoefficient } = require('./diceCoefficient');
const stringSimilarity = require("string-similarity");

const paymentSlip = {
  "_id": "618e28d1127da200087a9c42",
  "resultObject": {
      "s3Bucket": "hl-app-clientreceipts-uat",
      "s3FileKey": "upload/MN-0000001342/5f0274a0-4394-11ec-8e84-d7fc0472c008.jpg",
      "nlpData": {
          "text": "持卡人注視 CARDHOLDER COPY\n要 BEA東亞銀行\n*\nKYO NATANI R G&J CIKH 8\nSHOP G7-G8 G/F\nKORNHILL PLAZA\n581219631003001\n12832837\nMID\nTID\nCARD NUMBER\n6244788888882921 (L)\n中國聯\n交易型(TX)\n金萌售SALE\n有效期(Expiry MM/YY)\nXX/XX\n批次(Batch No.)\n000289\n德(Trace)\n047430\n日期/時間(Date/Time)\n2021/11/12 13:33:23\n交易参考試(Ref, No.)\n211112605433\n(Auth. Code)\n037979\nIN LAS (UPI Trace) 930211\n認參考(UPI RRN)\n131613930211\nHKD321.20\nBASE\nTIP\n: HKD\n想额 TOTAL\nAPP:UnionPay Credit\nAID: A000000333010102 TUR: 0000000000\nTC EBBFA6DCE9BCA2803 181:0000 ATC: 007F\n無需籤署\nNO SIGNATURE REQUIRED\n本人或以上交易,同意將其記入本卡根户\nI PROMISE TO PAY ABOVE TOTAL IN ACCORDANCE\nWITH CARD TEBUER AGREEMENT\n",
          "entities": {
              "address": [
                  {
                      "content": "SHOP G7-G8 G/F",
                      "score": 0.8275278210639954,
                      "startOffset": "58",
                      "endOffset": "72"
                  }
              ],
              "date": [
                  {
                      "content": "日期/時間(Date/Time)\n2021/11/12",
                      "score": 0.8735726475715637,
                      "startOffset": "235",
                      "endOffset": "262"
                  }
              ],
              "mall": [
                  {
                      "content": "KORNHILL PLAZA",
                      "score": 0.7645949721336365,
                      "startOffset": "73",
                      "endOffset": "87"
                  }
              ],
              "paymentMethod": [],
              "phone": [],
              "receiptNo": [],
              "shop": [
                  {
                      "content": "東亞銀行",
                      "score": 0.6898994445800781,
                      "startOffset": "27",
                      "endOffset": "31"
                  }
              ],
              "totalPrice": []
          }
      }
  },
  "lookupObject": {
      "receiptDate": "2021-11-12T12:00:00",
      "invoiceNumber": "",
      "mallId": "f8a075ad-b1bd-4948-b548-f89774ab848d",
      "tenantId": "",
      "amount": "",
      "paymentMethod": ""
  },
  "lookupScore": {
      "receiptDate": 0.8735726475715637,
      "invoiceNumber": "",
      "mallId": 0.7645949721336365,
      "tenantId": 0.6898994445800781,
      "amount": "",
      "paymentMethod": ""
  },
  "lookupSuggestionObject": {
      "receiptDate": "2021-11-12T12:00:00",
      "invoiceNumber": "",
      "mallId": "f8a075ad-b1bd-4948-b548-f89774ab848d",
      "tenantId": "",
      "amount": "",
      "paymentMethod": ""
  },
  "fileKey": "upload/MN-0000001342/5f0274a0-4394-11ec-8e84-d7fc0472c008.jpg",
  "updateTime": "2021-11-12T08:41:53.336Z",
  "__v": 0,
  "isPaymentSlip": true
}

const receipt = {
  "_id": "618e28d079607c0009d0f524",
  "resultObject": {
      "s3Bucket": "hl-app-clientreceipts-uat",
      "s3FileKey": "upload/MN-0000001342/5e192610-4394-11ec-8e84-d7fc0472c008.jpg",
      "nlpData": {
          "text": "變和民\n本部法们鲜料理\nKYO WATAMI\nKYO Watami\n太古康礦場地下7-8號店\n證號:203\n人數:4\n檯\n帳單:-1195\n000-\n日期:2021/11/12 12:35:34\n總金額5321.20\n每人平均消費:$80.30\n客戶存根\n001-2021/11/12 13:31:41 LẦN\n000-1195 [1]\n",
          "entities": {
              "address": [
                  {
                      "content": "地下7-8號店",
                      "score": 0.7706015110015869,
                      "startOffset": "39",
                      "endOffset": "46"
                  }
              ],
              "date": [
                  {
                      "content": "日期:2021/11/12",
                      "score": 0.8321359753608704,
                      "startOffset": "75",
                      "endOffset": "88"
                  }
              ],
              "mall": [],
              "paymentMethod": [],
              "phone": [],
              "receiptNo": [],
              "shop": [],
              "totalPrice": [
                  {
                      "content": "總金額",
                      "score": 0.7302164435386658,
                      "startOffset": "98",
                      "endOffset": "101"
                  }
              ]
          }
      }
  },
  "lookupObject": {
      "receiptDate": "2021-11-12T12:00:00",
      "invoiceNumber": "",
      "mallId": "",
      "tenantId": "",
      "amount": "",
      "paymentMethod": ""
  },
  "lookupScore": {
      "receiptDate": 0.8321359753608704,
      "invoiceNumber": "",
      "mallId": "",
      "tenantId": "",
      "amount": "",
      "paymentMethod": ""
  },
  "lookupSuggestionObject": {
      "receiptDate": "2021-11-12T12:00:00",
      "invoiceNumber": "",
      "mallId": "",
      "tenantId": "",
      "amount": "",
      "paymentMethod": ""
  },
  "fileKey": "upload/MN-0000001342/5e192610-4394-11ec-8e84-d7fc0472c008.jpg",
  "updateTime": "2021-11-12T08:41:52.822Z",
  "__v": 0
}

let tenants = [
  {
      "target": "La’taste (Kornhill Plaza)",
      "rating": 0.0036101083032490976
  },
  {
      "target": "品越 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "品越 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Meka",
      "rating": 0
  },
  {
      "target": "美康",
      "rating": 0
  },
  {
      "target": "美康",
      "rating": 0
  },
  {
      "target": "Yamazaki Bakery",
      "rating": 0.007339449541284404
  },
  {
      "target": "山崎面飽",
      "rating": 0
  },
  {
      "target": "山崎面饱",
      "rating": 0
  },
  {
      "target": "Shanghai Lao Lao",
      "rating": 0
  },
  {
      "target": "上海姥姥",
      "rating": 0
  },
  {
      "target": "上海姥姥",
      "rating": 0
  },
  {
      "target": "Rakuraku Ramen",
      "rating": 0.007352941176470588
  },
  {
      "target": "樂拉麵",
      "rating": 0
  },
  {
      "target": "乐拉面",
      "rating": 0
  },
  {
      "target": "Yu Fung Chinese Medicine Centre",
      "rating": 0.010752688172043012
  },
  {
      "target": "譽豐中醫診療中心 ",
      "rating": 0
  },
  {
      "target": "誉丰中医诊疗中心",
      "rating": 0
  },
  {
      "target": "Chateraise (Kornhill Plaza)",
      "rating": 0.01079136690647482
  },
  {
      "target": "Chateraise (康怡廣場)",
      "rating": 0.010968921389396709
  },
  {
      "target": "Chateraise (康怡广场)",
      "rating": 0.010968921389396709
  },
  {
      "target": "EMMAS",
      "rating": 0.011194029850746268
  },
  {
      "target": "EMMAS",
      "rating": 0.011194029850746268
  },
  {
      "target": "EMMAS",
      "rating": 0.011194029850746268
  },
  {
      "target": "Sukhama",
      "rating": 0
  },
  {
      "target": "Sukhama",
      "rating": 0
  },
  {
      "target": "Sukhama",
      "rating": 0
  },
  {
      "target": "First Edible Nest (Quarry Bay)",
      "rating": 0.017953321364452424
  },
  {
      "target": "盞記",
      "rating": 0
  },
  {
      "target": "盏记",
      "rating": 0
  },
  {
      "target": "Lock Health (Kornhill Plaza) ",
      "rating": 0.0035971223021582736
  },
  {
      "target": "鎖健 (康怡廣場) ",
      "rating": 0
  },
  {
      "target": "锁健 (康怡广场)",
      "rating": 0
  },
  {
      "target": "AEON STYLE Kornhill",
      "rating": 0.0072992700729927005
  },
  {
      "target": "AEON STYLE康怡",
      "rating": 0.007380073800738007
  },
  {
      "target": "AEON STYLE康怡",
      "rating": 0.007380073800738007
  },
  {
      "target": "Airland",
      "rating": 0.0037174721189591076
  },
  {
      "target": "雅蘭床褥",
      "rating": 0
  },
  {
      "target": "雅兰床褥",
      "rating": 0
  },
  {
      "target": "CAMELA",
      "rating": 0.0111731843575419
  },
  {
      "target": "CAMELA",
      "rating": 0.0111731843575419
  },
  {
      "target": "CAMELA",
      "rating": 0.0111731843575419
  },
  {
      "target": "Eu Yan Sang (Kornhill Plaza)",
      "rating": 0
  },
  {
      "target": "余仁生 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "余仁生 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Little Bear Baking Supplies Shop",
      "rating": 0.007155635062611807
  },
  {
      "target": "小熊烘焙材料店",
      "rating": 0
  },
  {
      "target": "小熊烘焙材料店",
      "rating": 0
  },
  {
      "target": "Three",
      "rating": 0.0037313432835820895
  },
  {
      "target": "和記電訊",
      "rating": 0
  },
  {
      "target": "和记电讯",
      "rating": 0
  },
  {
      "target": "Marugame Seimen (Kornhill Plaza)",
      "rating": 0.007142857142857143
  },
  {
      "target": "丸龜製麵 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "丸龟制面 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Ulferts",
      "rating": 0
  },
  {
      "target": "歐化傢俬",
      "rating": 0
  },
  {
      "target": "欧化家俬",
      "rating": 0
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Shanghai Lao Lao",
      "rating": 0
  },
  {
      "target": "上海姥姥",
      "rating": 0
  },
  {
      "target": "上海姥姥",
      "rating": 0
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Yu Fung Chinese Medicine Centre",
      "rating": 0.010752688172043012
  },
  {
      "target": "譽豐中醫診療中心 ",
      "rating": 0
  },
  {
      "target": "誉丰中医诊疗中心",
      "rating": 0
  },
  {
      "target": "Chateraise (Kornhill Plaza)",
      "rating": 0.01079136690647482
  },
  {
      "target": "Chateraise (康怡廣場)",
      "rating": 0.010968921389396709
  },
  {
      "target": "Chateraise (康怡广场)",
      "rating": 0.010968921389396709
  },
  {
      "target": "Lock Health (Kornhill Plaza) ",
      "rating": 0.0035971223021582736
  },
  {
      "target": "鎖健 (康怡廣場) ",
      "rating": 0
  },
  {
      "target": "锁健 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Little Bear Baking Supplies Shop",
      "rating": 0.007155635062611807
  },
  {
      "target": "小熊烘焙材料店",
      "rating": 0
  },
  {
      "target": "小熊烘焙材料店",
      "rating": 0
  },
  {
      "target": "HKTV mall",
      "rating": 0.0037105751391465678
  },
  {
      "target": "香港電視",
      "rating": 0
  },
  {
      "target": "香港电视",
      "rating": 0
  },
  {
      "target": "A-1 Bakery & Cafe",
      "rating": 0.007339449541284404
  },
  {
      "target": "A-1 Bakery",
      "rating": 0.007407407407407408
  },
  {
      "target": "A-1 Bakery",
      "rating": 0.007407407407407408
  },
  {
      "target": "Joni",
      "rating": 0.007476635514018692
  },
  {
      "target": "Joni ",
      "rating": 0.007476635514018692
  },
  {
      "target": "Joni",
      "rating": 0.007476635514018692
  },
  {
      "target": "Lam Kee Snack (Kiosk)",
      "rating": 0.007285974499089253
  },
  {
      "target": "林記懷舊小食",
      "rating": 0
  },
  {
      "target": "林记怀旧小食",
      "rating": 0
  },
  {
      "target": "Ming Fruit Shop",
      "rating": 0.003676470588235294
  },
  {
      "target": "名果店",
      "rating": 0
  },
  {
      "target": "名果店",
      "rating": 0
  },
  {
      "target": "SalalaBeauty",
      "rating": 0.003683241252302026
  },
  {
      "target": "SalalaBeauty",
      "rating": 0.003683241252302026
  },
  {
      "target": "SalalaBeauty",
      "rating": 0.003683241252302026
  },
  {
      "target": "Top One Boutique",
      "rating": 0.003669724770642202
  },
  {
      "target": "Top One Boutique ",
      "rating": 0.003669724770642202
  },
  {
      "target": "Top One Boutique",
      "rating": 0.003669724770642202
  },
  {
      "target": "Wai Yuen Tong",
      "rating": 0.0036900369003690036
  },
  {
      "target": "位元堂",
      "rating": 0
  },
  {
      "target": "位元堂",
      "rating": 0
  },
  {
      "target": "Shabu Sai",
      "rating": 0
  },
  {
      "target": "菜菜鍋",
      "rating": 0
  },
  {
      "target": "菜菜锅",
      "rating": 0
  },
  {
      "target": "Chin Chin Thai Cuisine",
      "rating": 0
  },
  {
      "target": "青青泰國料理",
      "rating": 0
  },
  {
      "target": "青青泰国料理",
      "rating": 0
  },
  {
      "target": "Genki Sushi",
      "rating": 0
  },
  {
      "target": "元気壽司",
      "rating": 0
  },
  {
      "target": "元気寿司",
      "rating": 0
  },
  {
      "target": "7-Eleven",
      "rating": 0.0037105751391465678
  },
  {
      "target": "7-Eleven",
      "rating": 0.0037105751391465678
  },
  {
      "target": "7-Eleven",
      "rating": 0.0037105751391465678
  },
  {
      "target": "Animate United",
      "rating": 0.025735294117647058
  },
  {
      "target": "日通動畫",
      "rating": 0
  },
  {
      "target": "日通动画",
      "rating": 0
  },
  {
      "target": "TamJai SamGor",
      "rating": 0
  },
  {
      "target": "譚仔三哥米線",
      "rating": 0
  },
  {
      "target": "谭仔三哥米线",
      "rating": 0
  },
  {
      "target": "Play Plus",
      "rating": 0.0037105751391465678
  },
  {
      "target": "Play Plus",
      "rating": 0.0037105751391465678
  },
  {
      "target": "Play Plus",
      "rating": 0.0037105751391465678
  },
  {
      "target": "A Nice Gift",
      "rating": 0.007407407407407408
  },
  {
      "target": "賞茶",
      "rating": 0
  },
  {
      "target": "赏茶",
      "rating": 0
  },
  {
      "target": "Cheong Kwan Jang",
      "rating": 0.003669724770642202
  },
  {
      "target": "正官莊",
      "rating": 0
  },
  {
      "target": "正官庄",
      "rating": 0
  },
  {
      "target": "Fotomax",
      "rating": 0
  },
  {
      "target": "快圖美",
      "rating": 0
  },
  {
      "target": "快图美",
      "rating": 0
  },
  {
      "target": "Pure Color Group Limited",
      "rating": 0.021739130434782608
  },
  {
      "target": "PURE COLOR染電發專門店",
      "rating": 0.018315018315018316
  },
  {
      "target": "PURE COLOR染电发专门店",
      "rating": 0.018315018315018316
  },
  {
      "target": "ABOUTHAI",
      "rating": 0.014842300556586271
  },
  {
      "target": "阿布泰國生活百貨",
      "rating": 0
  },
  {
      "target": "阿布泰国生活百货",
      "rating": 0
  },
  {
      "target": "O'Farm",
      "rating": 0
  },
  {
      "target": "綠盈坊有機店",
      "rating": 0
  },
  {
      "target": "绿盈坊有机店",
      "rating": 0
  },
  {
      "target": "CS-Models",
      "rating": 0.007407407407407408
  },
  {
      "target": "CS-Models",
      "rating": 0.007407407407407408
  },
  {
      "target": "CS-Models",
      "rating": 0.007407407407407408
  },
  {
      "target": "Deli-O",
      "rating": 0
  },
  {
      "target": "Deli-O",
      "rating": 0
  },
  {
      "target": "Deli-O",
      "rating": 0
  },
  {
      "target": "Yan Wo Tong Herbal Jelly Shop",
      "rating": 0.0036036036036036037
  },
  {
      "target": "仁和堂龜苓膏專門店",
      "rating": 0
  },
  {
      "target": "仁和堂龟苓膏专门店",
      "rating": 0
  },
  {
      "target": "Pure Massage",
      "rating": 0.0036900369003690036
  },
  {
      "target": "足君好",
      "rating": 0
  },
  {
      "target": "足君好",
      "rating": 0
  },
  {
      "target": "Mannings",
      "rating": 0.0037105751391465678
  },
  {
      "target": "萬寧",
      "rating": 0
  },
  {
      "target": "万宁",
      "rating": 0
  },
  {
      "target": "Towngas Customer Centre",
      "rating": 0.007246376811594203
  },
  {
      "target": "煤氣客戶中心",
      "rating": 0
  },
  {
      "target": "煤气客户中心",
      "rating": 0
  },
  {
      "target": "Stage (2) by Index Plus",
      "rating": 0.0036363636363636364
  },
  {
      "target": "Stage (2)",
      "rating": 0
  },
  {
      "target": "Stage (2)",
      "rating": 0
  },
  {
      "target": "Crystal Link",
      "rating": 0.007380073800738007
  },
  {
      "target": "晶之緣",
      "rating": 0
  },
  {
      "target": "晶之缘",
      "rating": 0
  },
  {
      "target": "flori",
      "rating": 0
  },
  {
      "target": "flori",
      "rating": 0
  },
  {
      "target": "flori",
      "rating": 0
  },
  {
      "target": "Crystal Link",
      "rating": 0.007380073800738007
  },
  {
      "target": "晶之緣",
      "rating": 0
  },
  {
      "target": "晶之缘",
      "rating": 0
  },
  {
      "target": "hana-musubi",
      "rating": 0
  },
  {
      "target": "華御結",
      "rating": 0
  },
  {
      "target": "华御结",
      "rating": 0
  },
  {
      "target": "My Nail Garden",
      "rating": 0.003683241252302026
  },
  {
      "target": "My Nail Garden",
      "rating": 0.003683241252302026
  },
  {
      "target": "My Nail Garden",
      "rating": 0.003683241252302026
  },
  {
      "target": "MX",
      "rating": 0
  },
  {
      "target": "MX",
      "rating": 0
  },
  {
      "target": "MX",
      "rating": 0
  },
  {
      "target": "Bo Bo A system",
      "rating": 0.0036900369003690036
  },
  {
      "target": "Bo Bo A system",
      "rating": 0.0036900369003690036
  },
  {
      "target": "Bo Bo A system",
      "rating": 0.0036900369003690036
  },
  {
      "target": "TeaWood",
      "rating": 0.0037174721189591076
  },
  {
      "target": "茶木",
      "rating": 0
  },
  {
      "target": "茶木",
      "rating": 0
  },
  {
      "target": "JHC",
      "rating": 0.003745318352059925
  },
  {
      "target": "日本城",
      "rating": 0
  },
  {
      "target": "日本城",
      "rating": 0
  },
  {
      "target": "R & K International",
      "rating": 0.014625228519195612
  },
  {
      "target": "R & K International ",
      "rating": 0.014625228519195612
  },
  {
      "target": "R & K International",
      "rating": 0.014625228519195612
  },
  {
      "target": "AC CUT",
      "rating": 0.007462686567164179
  },
  {
      "target": "AC單剪專門店",
      "rating": 0.0037174721189591076
  },
  {
      "target": "AC单剪专门店",
      "rating": 0.0037174721189591076
  },
  {
      "target": "Get Fresh",
      "rating": 0.0037105751391465678
  },
  {
      "target": "Get Fresh",
      "rating": 0.0037105751391465678
  },
  {
      "target": "Get Fresh",
      "rating": 0.0037105751391465678
  },
  {
      "target": "MOS Café",
      "rating": 0.0037174721189591076
  },
  {
      "target": "MOS Café",
      "rating": 0.0037174721189591076
  },
  {
      "target": "MOS Café",
      "rating": 0.0037174721189591076
  },
  {
      "target": "Fairwood",
      "rating": 0.0074211502782931356
  },
  {
      "target": "大快活",
      "rating": 0
  },
  {
      "target": "大快活",
      "rating": 0
  },
  {
      "target": "Lan Lan Cosmetic House",
      "rating": 0.007272727272727273
  },
  {
      "target": "靚靚日本化粧品",
      "rating": 0
  },
  {
      "target": "靓靓日本化妆品",
      "rating": 0
  },
  {
      "target": "Eye's Mate Optical",
      "rating": 0.007312614259597806
  },
  {
      "target": "愛視美眼鏡",
      "rating": 0
  },
  {
      "target": "爱视美眼镜",
      "rating": 0
  },
  {
      "target": "Wing Bay",
      "rating": 0.007434944237918215
  },
  {
      "target": "Wing Bay",
      "rating": 0.007434944237918215
  },
  {
      "target": "Wing Bay",
      "rating": 0.007434944237918215
  },
  {
      "target": "MINISO (Kornhill Plaza)",
      "rating": 0.014492753623188406
  },
  {
      "target": "名創優品 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "名创优品 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Parsons Music",
      "rating": 0.007366482504604052
  },
  {
      "target": "柏斯音樂",
      "rating": 0
  },
  {
      "target": "柏斯音乐",
      "rating": 0
  },
  {
      "target": "Carol Mei Skin Care Centre",
      "rating": 0.003616636528028933
  },
  {
      "target": "嘉露美護膚纖體美容中心",
      "rating": 0
  },
  {
      "target": "嘉露美护肤纤体美容中心",
      "rating": 0
  },
  {
      "target": "Gitti",
      "rating": 0.0037313432835820895
  },
  {
      "target": "Gitti",
      "rating": 0.0037313432835820895
  },
  {
      "target": "Gitti",
      "rating": 0.0037313432835820895
  },
  {
      "target": "Signoria",
      "rating": 0
  },
  {
      "target": "Signoria",
      "rating": 0
  },
  {
      "target": "Signoria",
      "rating": 0
  },
  {
      "target": "Circle K Convenience Stores",
      "rating": 0.021621621621621623
  },
  {
      "target": "OK便利店",
      "rating": 0
  },
  {
      "target": "OK便利店",
      "rating": 0
  },
  {
      "target": "ClubONE",
      "rating": 0.0037174721189591076
  },
  {
      "target": "會所1號",
      "rating": 0
  },
  {
      "target": "会所1号",
      "rating": 0
  },
  {
      "target": "Commercial Press",
      "rating": 0.01098901098901099
  },
  {
      "target": "商務印書館",
      "rating": 0
  },
  {
      "target": "商务印书馆",
      "rating": 0
  },
  {
      "target": "OPTICAL 88 (Kornhill Plaza)",
      "rating": 0.018018018018018018
  },
  {
      "target": "眼鏡88 (康怡廣場)",
      "rating": 0.0036968576709796672
  },
  {
      "target": "眼镜88 (康怡广场)",
      "rating": 0.0036968576709796672
  },
  {
      "target": "DR. KONG (Kornhill Plaza)",
      "rating": 0.007233273056057866
  },
  {
      "target": "DR. KONG (康怡廣場)",
      "rating": 0.007352941176470588
  },
  {
      "target": "DR. KONG (康怡广场)",
      "rating": 0.007352941176470588
  },
  {
      "target": "Imperial Bird's Nest Company Limited",
      "rating": 0.021314387211367674
  },
  {
      "target": "官燕棧",
      "rating": 0
  },
  {
      "target": "官燕栈",
      "rating": 0
  },
  {
      "target": "R & K International",
      "rating": 0.014625228519195612
  },
  {
      "target": "R & K International ",
      "rating": 0.014625228519195612
  },
  {
      "target": "R & K International",
      "rating": 0.014625228519195612
  },
  {
      "target": "FRESH",
      "rating": 0.007462686567164179
  },
  {
      "target": "FRESH 新鮮生活",
      "rating": 0.007407407407407408
  },
  {
      "target": "FRESH 新鲜生活",
      "rating": 0.007407407407407408
  },
  {
      "target": "TD JUNIOR (The Dresser)",
      "rating": 0.014519056261343012
  },
  {
      "target": "TD JUNIOR (The Dresser)",
      "rating": 0.014519056261343012
  },
  {
      "target": "TD JUNIOR (The Dresser)",
      "rating": 0.014519056261343012
  },
  {
      "target": "La Raine",
      "rating": 0
  },
  {
      "target": "La Raine",
      "rating": 0
  },
  {
      "target": "La Raine",
      "rating": 0
  },
  {
      "target": "Kate",
      "rating": 0.007476635514018692
  },
  {
      "target": "Kate",
      "rating": 0.007476635514018692
  },
  {
      "target": "Kate",
      "rating": 0.007476635514018692
  },
  {
      "target": "PROTREK",
      "rating": 0.01486988847583643
  },
  {
      "target": "保捷行",
      "rating": 0
  },
  {
      "target": "保捷行",
      "rating": 0
  },
  {
      "target": "Mr. Steak Seafood・Steak",
      "rating": 0.007246376811594203
  },
  {
      "target": "Mr. Steak Seafood・Steak",
      "rating": 0.007246376811594203
  },
  {
      "target": "Mr. Steak Seafood・Steak",
      "rating": 0.007246376811594203
  },
  {
      "target": "The Graces Restaurant",
      "rating": 0.01818181818181818
  },
  {
      "target": "玉桃軒",
      "rating": 0
  },
  {
      "target": "玉桃轩",
      "rating": 0
  },
  {
      "target": "Natures Village",
      "rating": 0.007339449541284404
  },
  {
      "target": "樂健坊",
      "rating": 0
  },
  {
      "target": "乐健坊",
      "rating": 0
  },
  {
      "target": "Victoria Harbour Supreme (Kornhill Plaza) ",
      "rating": 0.007042253521126761
  },
  {
      "target": "海港薈 (康怡廣場) ",
      "rating": 0
  },
  {
      "target": "海港荟 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Best Glasses Boutique",
      "rating": 0.0036363636363636364
  },
  {
      "target": "博視睛品",
      "rating": 0
  },
  {
      "target": "博视睛品",
      "rating": 0
  },
  {
      "target": "Woods Pharmacy",
      "rating": 0.007352941176470588
  },
  {
      "target": "活士西藥房",
      "rating": 0
  },
  {
      "target": "活士西药房",
      "rating": 0
  },
  {
      "target": "IZONE",
      "rating": 0.0037313432835820895
  },
  {
      "target": "潮流滙",
      "rating": 0
  },
  {
      "target": "潮流汇",
      "rating": 0
  },
  {
      "target": "Beijing Tong Ren Tang",
      "rating": 0.007285974499089253
  },
  {
      "target": "北京同仁堂",
      "rating": 0
  },
  {
      "target": "北京同仁堂",
      "rating": 0
  },
  {
      "target": "In-coins Telecom",
      "rating": 0
  },
  {
      "target": "利豐通訊",
      "rating": 0
  },
  {
      "target": "利丰通讯",
      "rating": 0
  },
  {
      "target": "E & I Fashion",
      "rating": 0.0073937153419593345
  },
  {
      "target": "E & I Fashion",
      "rating": 0.0073937153419593345
  },
  {
      "target": "E & I Fashion",
      "rating": 0.0073937153419593345
  },
  {
      "target": "alfafa",
      "rating": 0
  },
  {
      "target": "alfafa",
      "rating": 0
  },
  {
      "target": "alfafa",
      "rating": 0
  },
  {
      "target": "Ming Fruit Shop (Kornhill Plaza)",
      "rating": 0.0035778175313059034
  },
  {
      "target": "名果店 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "名果店 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Sa Sa (Kornhill Plaza)",
      "rating": 0
  },
  {
      "target": "莎莎 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "莎莎 (康怡广场)",
      "rating": 0
  },
  {
      "target": "KYO WATAMI",
      "rating": 0.018518518518518517
  },
  {
      "target": "饗和民",
      "rating": 0
  },
  {
      "target": "飨和民",
      "rating": 0
  },
  {
      "target": "Greenery Music",
      "rating": 0.011029411764705883
  },
  {
      "target": "青苗琴行",
      "rating": 0
  },
  {
      "target": "青苗琴行",
      "rating": 0
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Jarvis Natural Organic Hair",
      "rating": 0.014414414414414415
  },
  {
      "target": "Gyu-Kaku",
      "rating": 0
  },
  {
      "target": "牛角",
      "rating": 0
  },
  {
      "target": "牛角",
      "rating": 0
  },
  {
      "target": "Bestmart 360˚",
      "rating": 0.003683241252302026
  },
  {
      "target": "優品360˚",
      "rating": 0.0037243947858473
  },
  {
      "target": "优品360˚",
      "rating": 0.0037243947858473
  },
  {
      "target": "La Vie Hair & Beauty",
      "rating": 0.007312614259597806
  },
  {
      "target": "La Vie Hair & Beauty",
      "rating": 0.007312614259597806
  },
  {
      "target": "La Vie Hair & Beauty",
      "rating": 0.007312614259597806
  },
  {
      "target": "Kam Kee Cafe",
      "rating": 0
  },
  {
      "target": "金記冰室",
      "rating": 0
  },
  {
      "target": "金记冰室",
      "rating": 0
  },
  {
      "target": "PizzaExpress",
      "rating": 0.011049723756906077
  },
  {
      "target": "PizzaExpress",
      "rating": 0.011049723756906077
  },
  {
      "target": "PizzaExpress",
      "rating": 0.011049723756906077
  },
  {
      "target": "Wellsoon Chinese Medicine Clinic",
      "rating": 0.014285714285714285
  },
  {
      "target": "和順堂中醫診所",
      "rating": 0
  },
  {
      "target": "和顺堂中医诊所",
      "rating": 0
  },
  {
      "target": "Manna Organic Station (Kornhill Plaza)",
      "rating": 0.01415929203539823
  },
  {
      "target": "嗎哪有機站 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "吗哪有机站 (康怡广场)",
      "rating": 0
  },
  {
      "target": "testing shop EN",
      "rating": 0.007352941176470588
  },
  {
      "target": "testing shop TC",
      "rating": 0.007352941176470588
  },
  {
      "target": "testing shop SC",
      "rating": 0.003676470588235294
  },
  {
      "target": "Starbucks Coffee",
      "rating": 0.003663003663003663
  },
  {
      "target": "Starbucks Coffee",
      "rating": 0.003663003663003663
  },
  {
      "target": "Starbucks Coffee",
      "rating": 0.003663003663003663
  },
  {
      "target": "Wanko",
      "rating": 0
  },
  {
      "target": "Wanko",
      "rating": 0
  },
  {
      "target": "Wanko",
      "rating": 0
  },
  {
      "target": "Jin Gong Guan",
      "rating": 0.0036900369003690036
  },
  {
      "target": "金公館",
      "rating": 0
  },
  {
      "target": "金公馆",
      "rating": 0
  },
  {
      "target": "Grand Kornhill Cinema",
      "rating": 0.0036363636363636364
  },
  {
      "target": "康怡戲院",
      "rating": 0
  },
  {
      "target": "康怡戏院",
      "rating": 0
  },
  {
      "target": "MI MING MART (Kornhill Plaza)",
      "rating": 0.014388489208633094
  },
  {
      "target": "彌明生活百貨 (康怡廣場)",
      "rating": 0
  },
  {
      "target": "弥明生活百货 (康怡广场)",
      "rating": 0
  },
  {
      "target": "Chicks",
      "rating": 0
  },
  {
      "target": "雞仔嘜",
      "rating": 0
  },
  {
      "target": "鸡仔唛",
      "rating": 0
  },
  {
      "target": "Sea Horse (Quarry Bay)",
      "rating": 0.01090909090909091
  },
  {
      "target": "Sea Horse 海馬牌 (鰂魚涌)",
      "rating": 0
  },
  {
      "target": "Sea Horse 海马牌 (鲗鱼涌)",
      "rating": 0
  }
];

tenants = tenants.map((tenant) => tenant.target);

let result = '';
const targetText = receipt.resultObject.nlpData.text;

/*
console.log('diceCoefficient from WIKI');
result = diceCoefficient(targetText, 'KYO WATAMI');

console.log('compare with KYO WAIAMI:', result);

result = diceCoefficient(targetText, 'Animate United');

console.log('compare with Animate United:', result);
console.log('');
*/

console.log('diceCoefficient from library');
result = stringSimilarity.findBestMatch(targetText, tenants);

console.log('compare:', result);
console.log('');

/*
console.log('check each row');
const textToSplit = receipt.resultObject.nlpData.text + paymentSlip.resultObject.nlpData.text;
let splitText = textToSplit.split('\n');

for(var i=0; i<splitText.length; i++){
  const text = splitText[i];
  for(var j=0; j<tenants.length; j++){
    const target = stringSimilarity.compareTwoStrings(text, tenants[j]);
    if(target > 0.3){
      console.log('index:', j);
      console.log(tenants[j]);
      console.log(target);
      console.log('');
    }
  }
}
*/


//help 