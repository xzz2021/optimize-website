import { isOpen } from "@/utils/platformOperation"
import { DEBUG } from "globals"
import { getPlatformNameTool } from "@/utils/tools"
import { commonFn } from "./utils/common"

const startGenerate = async () => {
  // 初始化平台开关 //  决定是否生成页面进行挂载
  // 检查当前网页 获取平台 //  "juejin.cn"   "www.zhihu.com"
  const platform = getPlatformNameTool(location.host)
  if (platform) {
    const res = await isOpen(platform)
    if (res) {
      // 开发模式时  的  自动刷新
      //  检查平台开关是否启用
      if (DEBUG) {
        // 开发模式时为真   //   生产模式为假
        const { createWsConnect } = require("ws-reload-plugin")
        createWsConnect({})
      }
      //  各个平台的公共函数
      commonFn(platform)
    }
  }
}

startGenerate()
