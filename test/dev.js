const assert = require('assert');
const dev = require('../dev');

describe('dev', () => {
  describe('根据IP获取资产信息',()=>{
    it('提供错误的参数,返回null',async()=>{
      const zhic=await dev.getByIP(
        'xxx'
      );
      // console.log(zhic);
      assert.ok(zhic);
    });
    
  });
});