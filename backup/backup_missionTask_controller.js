const httpStatus = require('http-status');
// const { omit } = require('lodash');
const MissionTask = require('../../models/missionTask.model');
const APIError = require('../../utils/APIError');
// const odiff = require('odiff');
// var diff = require('object-diff');
const { diff, addedDiff, deletedDiff, detailedDiff, updatedDiff } = require("deep-object-diff");
const { serializeError } = require('serialize-error');
const { crmHost, crmVs } = require("../../../config/vars");
const {
  getCrmDataWithPost,
  getCrmDataWithGet,
} = require('../crmAccessToken.controller');

/**
 *
 * @param {*} object
 * function to handle_postMissionTaskComplete_response
 */
 let handle_getMissionTaskListParam_response = async (object) => {
  return object;
};

/**
 *
 * @param {*} object
 * function to handle_postMissionTaskComplete_response
 */
 let handle_getMissionTaskParam_response = async (object) => {
  return object;
};

/**
 * function create the category
 */
exports.create = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers["user-agent"];
  try {
    const result = await MissionTask.insertMany(body);
    if (result) {
      console.log(
        `{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(result)}, "useragent":${JSON.stringify(userAgent)}}`
      );
      return callback(result);
    }
    throw new APIError({
      message: 'couldnot create category',
      status: httpStatus.NOT_FOUND,
    });
  } catch (error) {
    console.log(
      `{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};

/**
 * function get object by ID
 */
exports.get = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers["user-agent"];
  try {

    const missionTaskUrl = `${crmHost}${crmVs}/mission/task?taskId=${body.id}`;

    const getMissionTaskParam = await getCrmDataWithGet(
      missionTaskUrl,
      handle_getMissionTaskParam_response
    );

    // const category = await MissionTask.get(body.id);
    console.log(
      `{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(getMissionTaskParam)}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback(getMissionTaskParam);
  } catch (error) {
    console.log(
      `{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};

/**
 * function list all object of model
 */
exports.list = async (req, callback) => {
  const { headers, url } = req;
  const userAgent = headers['user-agent'];
  try {
    const collectionData = await MissionTask.list();
    console.log(
      `{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(collectionData)}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback(collectionData);
  } catch (error) {
    console.log(
      `{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};

/**
 * function list all object of model
 */
exports.delete = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers["user-agent"];
  try {
    const deleteResult = await MissionTask.delete(body.id);
    console.log(
      `{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(deleteResult)}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback(deleteResult);
  } catch (error) {
    console.log(
      `{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};

/**
 * function list all object of model
 */
exports.update = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers["user-agent"];
  try {
    const beforeUpdateObject = await MissionTask.get(body.id);
    const updateObject = await MissionTask.update(body);
    const change = await diff(beforeUpdateObject, updateObject);
    const output = {
      old_Object: beforeUpdateObject,
      update_Object: updateObject,
      change_content: change._doc,
    };
    // console.log('output', output);
    console.log(
      `{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(output)}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback(output);
  } catch (error) {
    console.log(
      `{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback({
      status: 0,
      error: serializeError(error),
    });
  }
};

