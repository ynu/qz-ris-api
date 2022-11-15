import ax from 'axios';
import Debug from 'debug';
import { authenticate } from './auth.mjs';
const warn = Debug('ynu-libs:ris-auth:warn');
const debug = Debug('ynu-libs:ris-auth:debug');
const error = Debug('ynu-libs:ris-auth:error');
const info = Debug('ynu-libs:ris-auth:info');


const { RIS_HOST } = process.env;

export const getByIP = async (ip, options = {}) => {
  info(`根据IP(${ip})获取资产信息`);
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;

  debug(`access_token:${token}`);

  const res = await ax.get(`${host}/shterm/api/dev?ipIs=${ip}`, {
    headers: {
      'st-auth-token': token,
    },
  });
  return res.data.content[0];
}

/**
 * 获取符合条件的资产列表
 * @param {Object} params 
 * @param {Object} options 
 * @returns 
 */
export const list = async (params = {}, options = {}) => {
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;

  // 生成查询字符串
  const qs = Object.keys(params).map(k => {
    const v = params[k];
    switch (k) {
      default:
        return `${k}=${v}`
    }
  }).join('&');
  debug(`生成的查询字符串是:${qs}`)

  const res = await ax.get(`${host}/shterm/api/dev?${qs}`, {
    headers: {
      'st-auth-token': token,
    },
  });
  return res.data;
}

export default {
  getByIP,
  list,
};