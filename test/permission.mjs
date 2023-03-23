import assert from 'assert';
import cache from 'memory-cache';
import { devAccPwd } from '../permission.mjs';

const { TEST_RIS_DEV_IP, TEST_RIS_DEV_ACCOUNT,
  RIS_HOST, RIS_USERNAME, RIS_PASSWORD } = process.env;

const options = {
  host: RIS_HOST,
  username: RIS_USERNAME,
  password: RIS_PASSWORD,
};

describe('permission 权限', () => {
  after(() => cache.clear());

  it('devAccPwd 获取资产账号密码', async () => {
    const res = await devAccPwd(TEST_RIS_DEV_IP, TEST_RIS_DEV_ACCOUNT, options);
    assert.ok(res);
  });
});