const assert = require('assert');
const user = require('../user');

describe('user', () => {
  describe('根据用户 ID 查询用户的信息',()=>{
    it('',async()=>{
      const getUser=await user.getById(
        'xxx'
      );
      // console.log(zhic);
      assert.ok(getUser);
    });
    
  });
  describe('创建新用户',()=>{
    it('',async()=>{
      const cUser=await user.create(
      );
      // console.log(zhic);
      assert.ok(cUser);
    });
    
  });
  describe('根据账号名称获取用户信息',()=>{
    it('',async()=>{
      const getUser=await user.getByLoginName(
        'xxx'
      );
      // console.log(zhic);
      assert.ok(getUser);
    });
    
  });
  describe('根据账号名称禁用用户',()=>{
    it('',async()=>{
      const disabU=await user.disableByLoginName(
      );
      // console.log(zhic);
      assert.ok(disabU);
    });
    
  });
});