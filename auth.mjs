import axios from 'axios';
import cache from 'memory-cache';
import Debug from 'debug';
const warn = Debug('ynu-libs:ris-auth:warn');
const error = Debug('ynu-libs:ris-auth:error');
const info = Debug('ynu-libs:ris-auth:info');

const { RIS_HOST, RIS_USERNAME, RIS_PASSWORD } = process.env;


export const authenticate = async (options = {}) => {
  const host = options.host || RIS_HOST;
  const username = options.username || RIS_USERNAME;
  const password = options.password || RIS_PASSWORD;
  info('开始获取token');

  const tokenCacheKey = `ris-token::${username}::${password}`;
  let token = cache.get(tokenCacheKey);
  if(token) {
    info(`从cache获取token()`);
    return token;
  } else {
    const res = await axios.post(`${host}/shterm/api/authenticate`, {
      username,
      password,
    });
    info(`获取token成功`);
    const ac=res.data.ST_AUTH_TOKEN;
    cache.put(tokenCacheKey, ac, 20000);//8分钟  480000
    return ac;
  } 
}

export const authTypes = async (options = {}) => {
  info('获取系统的所有认证方式');
  const host = options.host || RIS_HOST;
  const token = await authenticate(options);

  if (!token) {
    error('获取access_token失败');
    return {};
  }
  info(`access_token:${token}`);

  const res = await axios.get(`${host}/shterm/api/authType`, {
    headers: {
      'st-auth-token': token,
    }
  });
  return res.data;
}

export default {
  authenticate,
  authTypes,
};