const fetch = require('node-fetch');
const warn = require('debug')('ynu-libs:ris-auth:warn');
const error = require('debug')('ynu-libs:ris-auth:error');
const info = require('debug')('ynu-libs:ris-auth:info');
const { authenticate } = require('./auth');

const { RIS_TOKEN, RIS_HOST, RIS_USERNAME, RIS_PASSWORD } = process.env;

const getByIP = async (ip, options = {}) => {
  info(`根据IP(${ip})获取资产信息`);
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;
  const res = await fetch(`${host}/shterm/api/dev?ipIs=${ip}`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'st-auth-token': token,
    },
  });
  switch (res.status) {
    case 200:
      info(`获取成功`);
      return {
        ret: 0,
        ...await res.json(),
      }
    case 404:
    case 410:
      error(`指定的IP(${ip})不存在或已被删除`);
      return {
        ret: 404,
      };
    case 400:
      const result = await res.json();
      error(`参数错误(${JSON.stringify(result)})`);
      return {
        ret: 400,
        ...result,
      }
    default:
      error(`操作失败,未知错误(${res.status}[${res.statusText}])`);
      return {
        ret: -1,
      };
  }
}

module.exports = {
  getByIP,
};