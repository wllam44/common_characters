//hander
response: function (res, event, context) {
  res.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Content-Type,Accept,Authorization',
  }
}

//env.uat
NODE_ENV=development
PORT=3000
JWT_SECRET=bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4
JWT_EXPIRATION_MINUTES=525600
MONGO_URI=mongodb://mongodb:27017/hlcrm-cms-uat
MONGO_AWS_DB_URI=mongodb://documentdb-ap-southeast-1-s-hlcrm.cluster-c9jnqikildom.ap-southeast-1.docdb.amazonaws.com:27017/hlcrm-cms-uat?replicaSet=rs0&retryWrites=false
MONGO_USERNAME=hlcrmidentity
MONGO_PASSWORD=aLD7L7Sr9M3SVGgj
MONGO_SSL_CA_FILE=rds-combined-ca-bundle.pem

# AWS:
AWS_ACCESS_KEY_ID=AKIAQLLWRF3QLJIXBJEN
AWS_SECRET_ACCESS_KEY=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
AWS_COGNITO_USERPOOL=ap-southeast-1_6dZs7pzIb
AWS_COGNITO_AUDIENCE=1g3dsu379hn2fi1vo8n0co1775

CRM_HOST=https://hanglung-loyaltycore-dev.herokuapp.com
CRM_VERSION=/v2


//tag.controller
/**
 * function list all object of model
 */
 exports.testAPI = async (req, callback) => {
  const { headers, url, adminUser, cookies } = req;
  const userAgent = headers["user-agent"];
  try {
    return callback({ status: 1, headers, cookies, adminUser });
  } catch (error) {
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};


//index.js
router.route('/tag/testAPI')
  .post((req, res, next) => {
    // const { headers } = req;
    Tag.testAPI(req, (callback) => {
      res.send(callback);
    });
  });

// express

const cookieParser = require('cookie-parser');

// enable CORS - Cross Origin Resource Sharing
app.use(cors({
  credentials: true,
  origin: true,
}));

// receive cookies from each request
app.use(cookieParser());


else if (process.env.functionEnv === "cms") {
  app.use(async (req, res, next) => {
    console.log(
      `{ "tag": "info", "call": "all", "env": ${JSON.stringify(process.env)}}`
    );
    const { headers, body, cookies } = req;
    let payload = {};
    let isAuthorized = false;

    if (cookies.authorization) {
      const jwtValidator = new JWTValidator({
        region: "ap-southeast-1",
        userPoolId: cognitUserPool,
        tokenUse: ["id", "access"],
        audience: [cognitAudience],
      });

      let accessTokenFromClient = cookies.authorization;

      try {
        let response = await jwtValidator.validate(accessTokenFromClient);
        req.adminUser = response;
        payload.memberId = req.adminUser.email;
        isAuthorized = true;
      } catch (err) {
        console.log(`{ "tag": "info", "call": "cognito", "err": ${err}}`);
        /*
        return res.send({
          status: 0,
          error: err
        });
        */
      }
    } else if (headers.authorization) {
      if (headers.authorization === 'developer') {
        req.adminUser = {
          name: headers.authorization,
          email: headers.authorization,
        }
        payload.memberId = headers.authorization;
        isAuthorized = true;
      } else {
        console.log(`{ "tag": "info", "call": "cognito", "err": ${'Request token invalid'}}`);
        /*
        return res.send({
          status: 0,
          code: -20,
          error: 'Request token invalid',
        });
        */
      }
    }

    if (isAuthorized) {
      const log_request = {
        headers,
        body,
        memberId: payload.memberId,
      };

      console.log(
        `{ "tag": "info", "call": "${req.url}", "request": ${JSON.stringify(
          log_request
        )}}`
      );

      // next();
    } else {
      console.log(`{ "tag": "info", "call": "cognito", "err": ${'Request token missing'}}`);
      /*
      return res.send({
        status: 0,
        code: -19,
        headers,
        cookies,
        error: 'Request token missing',
      });
      */
    }
    next();
  });
}