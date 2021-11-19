// call api from crm and fetch data, timeout from crm doesn't know, node.js add timeout for that. Timeout should be dynamic from AWS lambda, lamdba timeout call allowance, node.js -500ms, timeout error message.

/*
const main = (checkingTime, findingTime, cbSuccess, cbFailed) => {
  let foundDataInTime = false;

  const checkIsFoundData = setTimeout(() => {
    if(foundDataInTime){
      cbSuccess();
    } else {
      cbFailed();
    }
  }, checkingTime);

  const foundData = setTimeout(() => {
    foundDataInTime = true;
  }, findingTime);
}

const callbackSuccess = () => {
  console.log('success to find data in time');
}

const callbackFailed = () => {
  console.log('failed to find data in time');
}

main(100, 40, callbackSuccess, callbackFailed);
*/

/**
 * function create the category
 */
 exports.testTimeout = async (req, callback) => {
  const { headers, body, apiUrl, context } = req;
  const userAgent = headers["user-agent"];

  try {
    let response = { status: 0, message: 'init' };
    let result = '';

    if (process.env.AWS_EXECUTION_ENV) {
      // const url = `${crmHost}${crmVs}/reward/upsert`;
      const url = '';
      let postUpsertRewardParams = '';

      setTimeout(() => {
        if (!postUpsertRewardParams) {
          return callback({
            status: 0,
            code: -10,
            message: 'Request Timeout Error',
          });
        }
      }, context.getRemainingTimeInMillis() - 500);

      postUpsertRewardParams = await getCrmDataWithPost(
        url,
        result,
        () => {},
      );

      if (postUpsertRewardParams) {
        console.log(
          `{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(
            postUpsertRewardParams
          )}, "useragent":${JSON.stringify(userAgent)}}`
        );

        if (postUpsertRewardParams.status !== 1)
        {
          response = postUpsertRewardParams;
        }
      };

      return callback(response);
    }

    response = {
      status: 0,
      code: -8,
      message: 'ENV does not allow to test timeout',
    };

    return callback(response);
  } catch (error) {
    console.log(
      `{ "tag": "error", "call": "${apiUrl}", "error": ${JSON.stringify(
        serializeError(error)
      )}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};

/**
 * API43: to test CRM timeout
 */
// dummy on partial return data
router.route('/testTimeout').post((req, res, next) => {
  rewards.testTimeout(req, (callback) => {
    res.send(callback);
  });
});