# template-rest-api

## 环境变量

本应用的环境变量管理基于[config](https://www.npmjs.com/package/config)这个库，对于一些如密码等比较机密的环境变量，可以在 config/custom-environment-variables.json 文件下进行映射，通过 export 或 set 命令设置环境变量后，即可在代码中通过 config 提供的 get() 方法读取到，更多详情请移步[config](https://www.npmjs.com/package/config)。
