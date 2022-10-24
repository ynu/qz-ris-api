// const axios = require('axios/dist/node/axios.cjs');
const fetch = require('node-fetch');
const cache = require('memory-cache');
const warn = require('debug')('ynu-libs:ris-auth:warn');
const error = require('debug')('ynu-libs:ris-auth:error');
const info = require('debug')('ynu-libs:ris-auth:info');

const { RIS_HOST, RIS_USERNAME, RIS_PASSWORD } = process.env;
const HOST = RIS_HOST;

class WecomError extends Error {
  constructor (code, message) {
    super(message);
    this.code = code;
  }
 }


const authenticate = async (options = {}) => {
  const host = options.host || RIS_HOST;
  const username = options.username || RIS_USERNAME;
  const password = options.password || RIS_PASSWORD;
  info('开始获取token');

  const tokenCacheKey = `ris-token::${username}::${password}`;
  let token = cache.get(tokenCacheKey);
  if(token){
    info(`从cache获取token()`);
    return token;
  }else{
    const res = await fetch(`${host}/shterm/api/authenticate`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // const result = await res.json();
    // console.log(res);
    switch (res.status) {
      case 200:
        info(`获取token成功`);
        const ac=(await res.json()).ST_AUTH_TOKEN;
        cache.put(tokenCacheKey, ac, 20000);//8分钟  480000
        console.log(ac);
        return ac;
      default:
        error(`获取token失败,未知错误(${res.status})`);
        return null;
    }
    //  if (!result.errcode) {
    //    info(`获取token成功::${result.access_token}`);
    //    cache.put(tokenCacheKey, result.access_token, (result.expires_in - 20)*1000);
    //    return result.access_token;
    //  }
    //  warn('getToken出错:', result);
    //  throw new WecomError(result.errcode, result.errmsg);
  }

  
}

const authTypes = async (options = {}) => {
  info('获取系统的所有认证方式');
  const host = options.host || HOST;
  const token = await authenticate(options);

  if (!token) {
    error('获取access_token失败');
    return {};
  }
  info(`access_token:${token}`);

  const res = await fetch(`${host}/shterm/api/authType`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'st-auth-token': token,
    },
  });

  const result = await res.json();
  if (res.status===200) 
    return result;
  else{
    error('authTypes出错:', result);
    return {};
  }
  
  // return await res.json();
}

module.exports = {
  HOST,
  authenticate,
  authTypes,
};