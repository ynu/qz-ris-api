import assert from 'assert';
import cache from 'memory-cache';
import { getByIP } from '../dev.mjs';

const { TEST_RIS_DEV_IP } = process.env;

describe('dev 设备信息', () => {
  after(() => cache.clear());

  describe('根据IP获取资产信息',()=>{
    it('正确获取资产信息',async () => {
      const res = await getByIP(TEST_RIS_DEV_IP);
      assert.equal(res.ip, TEST_RIS_DEV_IP);
    });
  });
});