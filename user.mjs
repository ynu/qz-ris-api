import ax from 'axios';
import Debug from 'debug';
import { authenticate } from './auth.mjs';
const warn = Debug('ynu-libs:ris-auth:warn');
const error = Debug('ynu-libs:ris-auth:error');
const info = Debug('ynu-libs:ris-auth:info');
const debug = Debug('ynu-libs:ris-auth:debug');

const { RIS_HOST } = process.env;

export const getById = async (id, options = {}) => {
    info(`根据用户 ID(${id}) 查询用户的信息`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;

    const res = await ax.get(`${host}/shterm/api/user/${id}`, {
      headers: {
        'st-auth-token': token,
      },
    });
    return res.data;
  }

export const create = async (loginName, userName, authType, role, department, others = {}, options = {}) => {
  info(`创建新用户(${loginName})`);
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;

  const user = {
    loginName,
    userName,
    authType: {
      id: authType
    },
    role: {
      id: role
    },
    department: {
      id: department
    },
    ...others,
  };
  const res = await ax.post(`${host}/shterm/api/user`, user, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'st-auth-token': token,
    },
  });
  return res.data;
}

export const getByLoginName = async (loginName, options = {}) => {
  info(`根据账号名称(${loginName})获取用户信息`);
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;

  const res = await ax.get(`${host}/shterm/api/user/loginName/${loginName}`, {
    headers: {
      'st-auth-token': token,
    },
  });
  return res.data;
}


export const disableByLoginName = async (loginName, options = {}) => {
  info(`根据账号名称(${loginName})禁用用户`);
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;

  const res = await ax.put(`${host}/shterm/api/user/loginName/${loginName}/1`, {}, {
    headers: {
      'st-auth-token': token,
    },
  });
  return res.data;
}

/**
 * 获取符合条件的用户列表
 * @param {Object} params 过滤参数
 *    - page
 *    - size
 *    - sort
 * @param {Object} options 
 */
export const list = async (params = {}, options = {}) => {
  const token = await authenticate(options);
  const host = RIS_HOST || options.host;

  // 生成查询字符串
  const qs = Object.keys(params).map(k => {
    const v = params[k];
    switch (k) {
      case 'authType':
        return `${k}.idIn=${v.join(',')}`;
      default:
        return `${k}=${v}`
    }
  }).join('&');
  debug(`生成的查询字符串是:${qs}`)

  const res = await ax.get(`${host}/shterm/api/user?${qs}`, {
    headers: {
      'st-auth-token': token,
    },
  });
  return res.data;
}


  
  export default {
    getById,
    getByLoginName,
    create,
    disableByLoginName,
    list,
  };

