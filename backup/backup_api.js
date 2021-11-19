// mongodb://localhost:27017

/* index */
/*
router.route('/ocr/getNumOfSuccessApproval')
  .post((req, res, next) => {
    // const { headers, body } = req;
    ocr.getNumOfSuccessApproval(req, (callback) => {
      res.send(callback);
    });
  });

router.route('/ocr/getSuccessApproval')
  .post((req, res, next) => {
    // const { headers, body } = req;
    ocr.getSuccessApproval(req, (callback) => {
      res.send(callback);
    });
  });

router.route('/ocr/getNumOfSuccessApprovalByTenant')
  .post((req, res, next) => {
    // const { headers, body } = req;
    ocr.getNumOfSuccessApprovalByTenant(req, (callback) => {
      res.send(callback);
    });
  });

router.route('/ocr/getSuccessApprovalByTenant')
  .post((req, res, next) => {
    // const { headers, body } = req;
    ocr.getSuccessApprovalByTenant(req, (callback) => {
      res.send(callback);
    });
  });
*/

/**
 * function get no.of success approval of model
 * 
/*
exports.getNumOfSuccessApproval = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers['user-agent'];
  try {

    const numOfSuccessApproval = await OCR.countDocuments({ approvalResult: 'success' });
    const totalNumOfRecord = await OCR.countDocuments({});

    const output = {
      status: 1,
      result: {
        approval: numOfSuccessApproval,
        total: totalNumOfRecord,
      },
    };

    // console.log('output', output);
    console.log(`{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(output)}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback(output);
  } catch (error) {
    console.log(`{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};
*/

/**
 * function get success approval of model
 */
/*
exports.getSuccessApproval = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers['user-agent'];
  try {
    const successApproval = await OCR.find({ approvalResult: 'success' });

    const output = {
      status: 1,
      result: successApproval,
    };

    // console.log('output', output);
    console.log(`{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(output)}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback(output);
  } catch (error) {
    console.log(`{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};
*/
/**
 * function get no.of success approval by tenant of model
 */
/*
exports.getNumOfSuccessApprovalByTenant = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers['user-agent'];
  try {

    const numOfSuccessApprovalbyTenant = await OCR.aggregate([
      { $match: { approvalResult: 'success' } },
      {
        $lookup: {
          from: 'tenants',
          localField: 'lookupObject.tenantId',
          foreignField: 'id', // need to change to _id for production
          as: 'tenant',
        },
      },
      {
        $group: {
          _id: { $arrayElemAt: ['$tenant._id', 0] },
          name: { $first: { $arrayElemAt: ['$tenant.name', 0] } },
          approval: { $sum: 1 },
        },
      },
    ]);

    const output = {
      status: 1,
      result: numOfSuccessApprovalbyTenant,
    };

    // console.log('output', output);
    console.log(`{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(output)}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback(output);
  } catch (error) {
    console.log(`{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};
*/
/**
 * function get success approval by tenant of model
 */
/*
exports.getSuccessApprovalByTenant = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers['user-agent'];
  try {

    const successApprovalbyTenant = await OCR.aggregate([
      { $match: { approvalResult: 'success' } },
      {
        $lookup: {
          from: 'tenants',
          localField: 'lookupObject.tenantId',
          foreignField: 'id', // need to change to _id for production
          as: 'tenant',
        },
      },
      {
        $group: {
          _id: { $arrayElemAt: ['$tenant._id', 0] },
          name: { $first: { $arrayElemAt: ['$tenant.name', 0] } },
          ocrData: {
            $push: {
              _id: '$_id',
              fileKey: '$fileKey',
              resultObject: '$resultObject',
              lookupObject: '$lookupObject',
              isPaymentSlip: '$isPaymentSlip',
              submitObject: '$submitObject',
              submitComparing: '$submitComparing',
              finalObject: '$finalObject',
              finalComparing: '$finalComparing',
              approvalResult: '$approvalResult',
            },
          },
        },
      },
    ]);

    const output = {
      status: 1,
      result: successApprovalbyTenant,
    };

    // console.log('output', output);
    console.log(`{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(output)}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback(output);
  } catch (error) {
    console.log(`{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};
*/

/**
 * function get no.of success approval by tenant of model
 */
 exports.getNumOfSuccessApprovalByTenant = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers['user-agent'];
  try {
    const { isPaymentSlip } = body;
    let search = {};
    let groupOCR = {};
    let result = [];
    let response = { status: 0 };

    if (isPaymentSlip === undefined || isPaymentSlip === 'all') {
      search = { $and: [{ $or: [{ isPaymentSlip: false }, { isPaymentSlip: true }, { isPaymentSlip: { $exists: false } }] }, { submitObject: { $ne: null } }] };
    } else if (isPaymentSlip === true || isPaymentSlip === 'true') {
      search = { $and: [{ isPaymentSlip: true }, { submitObject: { $ne: null } }] };
    } else if (isPaymentSlip === false || isPaymentSlip === 'false') {
      search = { $and: [{ isPaymentSlip: false }, { submitObject: { $ne: null } }] };
    }
  
    const result = await OCR.aggregate([
      { $match: search },
      {
        $project: {
          _tenantId: {
            $convert: {
              input: '$finalObject.tenantId', to: 'objectId', onError: '', onNull: '',
            },
          },
          lookupSuggestionObject: 1,
          approvalResult: 1,
        },
      },
      {
        $lookup: {
          from: 'tenants',
          localField: '_tenantId',
          foreignField: '_id',
          as: 'tenant',
        },
      },
      {
        $group: {
          _id: { $arrayElemAt: ['$tenant._id', 0] },
          name: { $first: { $arrayElemAt: ['$tenant.name', 0] } },
          ocr: {
            $sum: {
              $cond: [
                { $and: [{ $ne: ['$lookupSuggestionObject.tenantId', null] }, { $ne: ['$lookupSuggestionObject.tenantId', ''] }] }, 1, 0,
              ],
            },
          },
          approved: {
            $sum: {
              $cond: [
                { $eq: [{ $toLower: '$approvalResult' }, 'approved'] }, 1, 0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          name: { $ifNull: ['$name', { en: 'Unknown', tc: 'Unknown', sc: 'Unknown' }] },
          ocr: 1,
          approved: 1,
          rate: { $divide: ['$approved', '$ocr'] },
        },
      },
      {
        $sort: { 'name.en': 1 },
      },
    ]);

    if (result) {
      response = {
        status: 1,
        result: result,
      };
      console.log(`{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(response)}, "useragent":${JSON.stringify(userAgent)}}`);
    }
    return callback(response);
  } catch (error) {
    console.log(`{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};