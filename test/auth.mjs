import assert from 'assert';
import cache from 'memory-cache';
import { authenticate, authTypes } from '../auth.mjs';

describe('auth', () => {
  after(() => cache.clear());
  describe('authenticate 获取token', () => {
    it('不提供参数时，默认使用环境变量获取token', async () => {
      const token = await authenticate();
      assert.ok(token);
    });
  });
  describe('authTypes 获取系统的所有认证方式', () => {
    it('返回正确', async () => {
      const types = await authTypes();
      assert.ok(types);
    });
  });
});