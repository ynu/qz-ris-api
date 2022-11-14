import assert from 'assert';
import cache from 'memory-cache';
import { getById, create, getByLoginName, disableByLoginName } from '../user';

describe('user 模块', () => {
  after(() => cache.clear());

  describe('根据用户 ID 查询用户的信息',()=>{
    
  });
  describe('创建新用户',()=>{
  });
  describe('根据账号名称获取用户信息',()=>{
  });
  describe('根据账号名称禁用用户',()=>{
  });
});