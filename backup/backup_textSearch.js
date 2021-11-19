const stringSimilarity = require("string-similarity");

exports.textSearch = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers['user-agent'];
  try {
    let response = { status: 1 };

    const { text } = body;

    const exactContain = "\"" + text + "\"";
    const eitherContain = text;

    const data = await Tenant.find(
      { $text: { $search: eitherContain } },
      { score: { $meta: "textScore" } }
    ).sort( { score: { $meta: "textScore" } } )

    const result = {
      size: data.length,
      data
    };

    console.log(`{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(response)}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback(result);
  } catch (error) {
    console.log(`{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};


router.route('/ocr/textSearch')
  .post((req, res, next) => {
    // const { headers, body } = req;
    ocr.textSearch(req, (callback) => {
      res.send(callback);
    });
  });


// ocr getTenant final step:
// 1. use ocr.nlpData.text result to find tenant from "Tenant" collection by "textSearch" and "mall"
// 2. use string-similarity library to find the best match case between the ocr.nlpData.text result and the result from step 1. 
// 3. find the tenant object by the result from step 2.



if (!phoneTestFound && !shopTestFound && nlpData.text) {
  let tenants = [];

  if (!mallId) {
    tenants = await Tenant.find(
      { $text: { $search: nlpData.text } },
      { score: { $meta: 'textScore' } },
    ).sort({ score: { $meta: 'textScore' } });
  } else {
    tenants = await Tenant.find(
      { $and: [{ $text: { $search: nlpData.text }}, { mall: mallId }] },
      { score: { $meta: 'textScore' } },
    ).sort({ score: { $meta: 'textScore' } });
  }

  let tenantNames = [];
  for (let tenant of tenants) {
    tenantNames.push(tenant.name.en);
    tenantNames.push(tenant.name.tc);
    tenantNames.push(tenant.name.sc);
  }

  const compare = stringSimilarity.findBestMatch(
    text,
    tenantNames,
  );

  const bestMatch = compare.bestMatch;
  const target = bestMatch.target;
  const score = bestMatch.rating;
  const index = compare.bestMatchIndex;
  
  const tenantParams = tenants[Math.floor((index / tenantNames.length) * tenants.length)]; 
}

// < 50 || > 50000 will not count for getAmount
// website frontend