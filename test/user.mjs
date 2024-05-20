import assert from 'assert';
import cache from 'memory-cache';
import { getById, create, getByLoginName, disableByLoginName, list } from '../user.mjs';

describe('user 模块', () => {
  after(() => cache.clear());

  describe('根据用户 ID 查询用户的信息',()=>{
    
  });
  it('创建新用户',async ()=>{
    const res = await create('20080081', 'test123', 101, 5, 1092, {
      authInfo: {
        passwordType: 'custom',
        phoneNumber: '13398762345',
      },
      password: 'd3ddz#xDs!',
      extInfo: {
        '2': '公司名称'
      },
    });
    console.log(res);
  });
  describe('根据账号名称获取用户信息',()=>{
  });
  describe('根据账号名称禁用用户',()=>{
  });
  it('获取符合条件的用户列表 list', async () => {
    const res = await list({
      size: 1,
    });
    assert.equal(res.totalElements === res.totalPages, true);
    assert.equal(res.content.length <= 1, true);
  });
});