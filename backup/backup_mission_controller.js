const httpStatus = require('http-status');
// const { omit } = require('lodash');
const Mission = require('../../models/mission.model');
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
const _ = require('lodash');

/**
 *
 * @param {*} object
 * function to handle_postMissionComplete_response
 */
 let handle_getMissionListParam_response = async (object) => {
  return object;
};

/**
 *
 * @param {*} object
 * function to handle_postMissionComplete_response
 */
 let handle_getMissionParam_response = async (object) => {
  return object;
};

/**
 * function create the category
 */
exports.create = async (req, callback) => {
  const { headers, body, url } = req;
  const userAgent = headers["user-agent"];
  try {
    const result = await Mission.insertMany(body);
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

    const missionUrl = `${crmHost}${crmVs}/mission?missionId=${body.id}`;

    const getMissionParam = await getCrmDataWithGet(
      missionUrl,
      handle_getMissionParam_response
    );

    /*
    let taskUrl = `${crmHost}${crmVs}/mission/task/list`;

    const getMissionTaskListParam = await getCrmDataWithGet(
      taskUrl,
      handle_getMissionListParam_response
    );
    */

    console.log(
      `{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(getMissionParam)}, "useragent":${JSON.stringify(userAgent)}}`
    );
    return callback(getMissionParam);
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
    const collectionData = await Mission.list();
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
 * function cmsList all object of model
 */
 exports.cmsList = async (req, callback) => {
  const { headers, url, query } = req;
  const userAgent = headers['user-agent'];
  try {

    let page = parseInt(query.page);
    let limit = parseInt(query.limit);
    let keyword = query.keyword;
    let sort = query.sort;

    let missionUrl = `${crmHost}${crmVs}/mission/list`;

    const getMissionListParam = await getCrmDataWithGet(
      missionUrl,
      handle_getMissionListParam_response
    );

    let taskUrl = `${crmHost}${crmVs}/mission/task/list`;

    const getMissionTaskListParam = await getCrmDataWithGet(
      taskUrl,
      handle_getMissionListParam_response
    );

    getMissionListParam.mission = getMissionListParam.mission.filter((item) => {
      if (!keyword) {
        return true;
      }
      const keywordLowerCase = keyword.toLowerCase();

      if (item.name && item.name.toLowerCase().includes(keywordLowerCase)) {
        return true;
      }

      if (item.cmsData) {
        if (item.cmsData.name.en && item.cmsData.name.en.toLowerCase().includes(keywordLowerCase)) {
          return true;
        }

        if (item.cmsData.name.tc && item.cmsData.name.tc.toLowerCase().includes(keywordLowerCase)) {
          return true;
        }

        if (item.cmsData.name.sc && item.cmsData.name.sc.toLowerCase().includes(keywordLowerCase)) {
          return true;
        }
      }

      return false;
    });

    if (sort) {
      getMissionListParam.mission.sort((itemA, itemB) => {
        if (sort.includes('name')) {
          return _.get(itemB, 'name', '').localeCompare(_.get(itemA, 'name', ''));
        }
        if (sort.includes('startDate')) {
          return new Date(itemB.startDate) - new Date(itemA.startDate);
        }
        return _.get(itemB, sort, '') - _.get(itemB, sort, '');
      });
    }

    const response = {
      status: 1,
      mission: !isNaN(page) && !isNaN(limit) ? getMissionListParam.mission.slice(page, page + limit) : getMissionListParam.mission,
      mission_task: getMissionTaskListParam.mission_task,
      totalItem: getMissionListParam.mission.length,
    };

    console.log(`{ "tag": "info", "call": "${url}", "response": ${JSON.stringify(response)}, "useragent":${JSON.stringify(userAgent)}}`);
    return callback(response);
  } catch (error) {
    console.log(`{ "tag": "error", "call": "${url}", "error": ${JSON.stringify(serializeError(error))}, "useragent":${JSON.stringify(userAgent)}}`);
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
    const deleteResult = await Mission.delete(body.id);
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
    const beforeUpdateObject = await Mission.get(body.id);
    const updateObject = await Mission.update(body);
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

