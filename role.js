const fetch = require('node-fetch');
const warn = require('debug')('ynu-libs:ris-auth:warn');
const error = require('debug')('ynu-libs:ris-auth:error');
const info = require('debug')('ynu-libs:ris-auth:info');
const { authenticate } = require('./auth');

const { RIS_TOKEN, RIS_HOST, RIS_USERNAME, RIS_PASSWORD } = process.env;

const allServices = async (options = {}) => {
    info(`获取所有可用服务`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;
  
    if (!token) {
      error('获取access_token失败');
      return {};
    }
    info(`access_token:${token}`);
  
    const res = await fetch(`${host}/shterm/api/role/getAllServices`, {
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
        error('allServices出错:', result);
        return {};
    }
  }

  const getLoginUserRole = async (options = {}) => {
    info(`获取当前登录用户的角色信息`);
    const token = await authenticate(options);
    const host = RIS_HOST || options.host;
  
    if (!token) {
      error('获取access_token失败');
      return {};
    }
    info(`access_token:${token}`);
  
    const res = await fetch(`${host}/shterm/api/role/getLoginUserRole`, {
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
        error('getLoginUserRole出错:', result);
        return {};
    }
  }
  
  module.exports = {
    allServices,
    getLoginUserRole
  };

