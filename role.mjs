import ax from 'axios';
import Debug from 'debug';
import { authenticate } from './auth.mjs';
const warn = Debug('ynu-libs:ris-auth:warn');
const error = Debug('ynu-libs:ris-auth:error');
const info = Debug('ynu-libs:ris-auth:info');


const { RIS_HOST } = process.env;

export const allServices = async (options = {}) => {
    info(`获取所有可用服务`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;

    const res = await ax.get(`${host}/shterm/api/role/getAllServices`, {
      headers: {
        'st-auth-token': token,
      },
    });
    return res.data;
  }

export const getLoginUserRole = async (options = {}) => {
  info(`获取当前登录用户的角色信息`);
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;

  const res = await ax.get(`${host}/shterm/api/role/getLoginUserRole`, {
      headers: {
      'st-auth-token': token,
      },
  });
  return res.data;
}
  
  export default {
    allServices,
    getLoginUserRole
  };

