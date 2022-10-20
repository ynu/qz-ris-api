const assert = require('assert');
const auth = require('../auth');

describe('auth', () => {
  describe('authenticate 获取token', () => {
    it('提供错误的参数,返回null', async () => {
      const token = await auth.authenticate({
        username: 'test',
        password: 'test',
      });
      assert.equal(token, null);
    });
    it('不提供参数时，默认使用环境变量获取token', async () => {
      const token = await auth.authenticate();
      assert.ok(token);
    });
  });
  describe('authTypes 获取系统的所有认证方式', () => {
    it('返回正确', async () => {
      const types = await auth.authTypes();
      assert.ok(types);
    });
  });
});