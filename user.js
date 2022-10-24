const fetch = require('node-fetch');
const warn = require('debug')('ynu-libs:ris-auth:warn');
const error = require('debug')('ynu-libs:ris-auth:error');
const info = require('debug')('ynu-libs:ris-auth:info');
const { authenticate } = require('./auth');

const { RIS_TOKEN, RIS_HOST, RIS_USERNAME, RIS_PASSWORD } = process.env;

const getById = async (id,options = {}) => {
    info(`根据用户 ID(${id}) 查询用户的信息`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;
  
    if (!token) {
      error('获取access_token失败');
      return {};
    }
    info(`access_token:${token}`);
  
    const res = await fetch(`${host}/shterm/api/user/${id}`, {
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
        error('getById查询用户的信息出错:', result);
        return {};
    }
  }

  const create = async (loginName, userName, authType, role, department, others = {}, options = {}) => {
    info(`创建新用户(${loginName})`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;
  
    if (!token) {
      error('获取access_token失败');
      return {};
    }
    info(`access_token:${token}`);
  
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
    const res = await fetch(`${host}/shterm/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'st-auth-token': token,
      },
      body: JSON.stringify(user),
    });
    const result = await res.json();
    // console.log(result);
    if (res.status===200) 
        return result;
    else{
        error('创建新用户出错:', result);
        return {};
    }
  }

  const getByLoginName = async (loginName,options = {}) => {
    info(`根据账号名称(${loginName})获取用户信息`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;
  
    if (!token) {
      error('获取access_token失败');
      return {};
    }
    info(`access_token:${token}`);
  
    const res = await fetch(`${host}/shterm/api/user/loginName/${loginName}`, {
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
        error('getByLoginName出错:', result);
        return {};
    }
  }


  const disableByLoginName = async (loginName,options = {}) => {
    info(`根据账号名称(${loginName})禁用用户`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;
  
    if (!token) {
      error('获取access_token失败');
      return {};
    }
    info(`access_token:${token}`);
  
    const res = await fetch(`${host}/shterm/api/user/loginName/${loginName}/1`, {
      method: 'PUT',
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
        error('disableByLoginName出错:', result);
        return {};
    }
  }


  
  module.exports = {
    getById,
    getByLoginName,
    create,
    disableByLoginName,
  };

