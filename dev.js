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

  if (!token) {
    error('获取access_token失败');
    return {};
  }
  info(`access_token:${token}`);

  const res = await fetch(`${host}/shterm/api/dev?ipIs=${ip}`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'st-auth-token': token,
    },
  });
  const result = await res.json();
  // console.log(result);
  if (res.status===200) 
    return result;
  else{
    error('getByIP获取资产信息出错:', result);
    return {};
  }
}

module.exports = {
  getByIP,
};