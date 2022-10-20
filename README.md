# qz-ris-api
齐治堡垒机Restful API

## 测试
使用`mocha`进行测试，为保证安全，测试所用的`host`、`username`和`password`需通过环境变量传入。可使用以下命令：
```
clear && export RIS_HOST=https://example.com && \
export RIS_USERNAME=test \
export RIS_PASSWORD=pass && mocha
```
或在本地配置相关环境变量。
