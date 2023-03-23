import ax from 'axios';
import Debug from 'debug';
import { authenticate } from './auth.mjs';
const warn = Debug('qz-ris-api:permission:warn');
const debug = Debug('qz-ris-api:permission:debug');
const error = Debug('qz-ris-api:permission:error');
const info = Debug('qz-ris-api:permission:info');


const { RIS_HOST } = process.env;

export const devAccPwd = async (ip, account, options = {}) => {
  info(`获取资产(${ip})账号${account}密码`);
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;
  try {
    const res = await ax.post(`${host}/shterm/api/perm/devAccPwd`, {
      ip,
      account,
    }, {
      headers: {
        'st-auth-token': token,
      },
    });
    return res.data;
  } catch (error) {
    warn('devAccPwd出错::', error.response.data);
    return null;
  }
  
}

export default {
  devAccPwd,
};