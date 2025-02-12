**本项目基于之前的vue版本[beautifyPage](https://github.com/xzz2021/beautifyPage), 使用react进行了重构优化!**

1. 全面引入typescript eslint pritter, 打包依旧基于webpack5!

2. 插件用途：去掉网站页面烦人的广告，解除登陆限制，文本复制限制, 一键复制代码, 增加各种自定义功能！

3. 考虑到灵活性，目前在options配置页面加入了动态增加平台， 及根据class和id动态屏蔽功能！

4. 同时支持一键导入导出json文件备份恢复数据！且导入会自动增量merge合并原有数据！(初始默认配置文件为目录下的default.json, 首次使用会自动导入)

![设置界面](https://github.com/xzz2021/public/blob/main/github/optimize-website/options1.png?raw=true)

`目录结构`

> 插件一般配置文件 `public`
> 插件配置页面 `src/options`
> 各平台组件入口 `src/pages`
> 插件背景页 `src/background`
> 插件内容脚本 `src/content.ts`
> 脚本注入 `src/inject.ts`

`打包使用`

执行 `npm run build` 后, 会输出 `xzz2021` 目录(等同于dist), 将此目录拖入浏览器插件管理页面即可!

`二次开发`

执行 `npm install` 安装依赖, 执行 `npm run dev`运行, 各平台组件入口 `src/pages`, 向开发新平台, 直接新建一个目录创建index.tsx文件即可, 会自动导入!
