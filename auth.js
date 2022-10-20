const axios = require('axios/dist/node/axios.cjs');
const warn = require('debug')('ynu-libs:ris-auth:warn');
const error = require('debug')('ynu-libs:ris-auth:error');
const info = require('debug')('ynu-libs:ris-auth:info');

const { RIS_HOST, RIS_USERNAME, RIS_PASSWORD } = process.env;
const HOST = RIS_HOST;

const authenticate = async (options = {}) => {
  const host = options.host || RIS_HOST;
  const username = options.username || RIS_USERNAME;
  const password = options.password || RIS_PASSWORD;
  info('开始获取token');
  try {
    const res = await axios.post(`${host}/shterm/api/authenticate`, {
      username,
      password,
    });
    return res.data.ST_AUTH_TOKEN
  } catch (err) {
    const { status } = err.response;
    switch (status) {
      case 401:
        error(`获取token失败,认证失败(${status})`);
        return null;
      default:
        error(`获取token失败,未知错误(${status})`);
        return null;
    }
  }
}

const authTypes = async (options = {}) => {
  info('获取系统的所有认证方式');
  const host = options.host || HOST;
  const token = await authenticate(options);

  const res = await axios.get(`${host}/shterm/api/authType`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'st-auth-token': token,
    },
  });
  return res.data;
}

module.exports = {
  HOST,
  authenticate,
  authTypes,
};