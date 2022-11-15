import assert from 'assert';
import cache from 'memory-cache';
import { getByIP, list } from '../dev.mjs';

const { TEST_RIS_DEV_IP } = process.env;

describe('dev 设备信息', () => {
  after(() => cache.clear());

  describe('根据IP获取资产信息',()=>{
    it('正确获取资产信息',async () => {
      const res = await getByIP(TEST_RIS_DEV_IP);
      assert.equal(res.ip, TEST_RIS_DEV_IP);
    });
  });
  it('获取符合条件的资产列表',async () => {
    const res = await list({
      size: 1,
    });
    assert.equal(res.totalElements === res.totalPages, true);
    assert.equal(res.content.length <= 1, true);
  });
});