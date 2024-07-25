**本项目基于之前的vue版本[beautifyPage](https://github.com/xzz2021/beautifyPage), 使用react进行了重构优化!**

全面引入typescript eslint pritter, 打包依旧基于webpack5!

插件用途：去掉网站页面烦人的广告，各种限制，增加各种自定义功能！

原有适配平台:

> * 知乎: `去广告 去登录.关注.右下角弹窗` `外链直接跳转`
> * csdn: `去广告` `代码直接复制` `一键复制代码` `直接展开博主文章` `外链直接跳转`
> * 掘金: `去广告` `外链直接跳转`
> * 简书: `去广告`  `外链直接跳转`
> * B站: `去广告`  `移除未登录视频自动暂停及登录弹窗` 

  考虑到灵活性，目前在options配置页面加入了动态增加平台， 及根据class和id动态屏蔽功能！
  
  同时支持一键导入导出json文件备份恢复数据！且导入会自动增量merge合并原有数据！(初始默认配置文件为目录下的default.json)

  ![设置界面](https://github.com/xzz2021/public/blob/main/github/optimize-website/options1.png?raw=true)

  ![功能一](https://github.com/xzz2021/public/blob/main/github/optimize-website/options2.png?raw=true)

  ![功能二](https://github.com/xzz2021/public/blob/main/github/optimize-website/options3.png?raw=true)