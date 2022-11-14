import assert from 'assert';
import cache from 'memory-cache';
import { allServices, getLoginUserRole } from '../role.mjs';

describe('role', () => {
  after(() => cache.clear());

  describe('获取所有可用服务',()=>{
    it('返回正确',async () => {
      const res = await allServices();
      assert.ok(res);
    });
  });
  describe('获取当前登录用户的角色信息',()=>{
    it('返回正确', async () => {
      const role = await getLoginUserRole();
      assert.ok(role);
    });
  });
});