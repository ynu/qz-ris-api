const assert = require('assert');
const role = require('../role');

describe('role', () => {
  describe('获取所有可用服务',()=>{
    it('返回正确',async()=>{
      const allS=await role.allServices();
      // console.log(allS);
      assert.ok(allS);
    });
  });
  describe('获取当前登录用户的角色信息',()=>{
    it('返回正确',async()=>{
      const login=await role.getLoginUserRole();
      // console.log(login);
      assert.ok(login);
    });
  });

});