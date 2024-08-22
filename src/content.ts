import { isOpen } from "@/utils/platformOperation"
import { DEBUG } from "globals"
import { getPlatformNameTool, sleep } from "@/utils/tools"
import { commonFn } from "./utils/common"
import { injectFile } from "./utils/injectFn"

const startGenerate = async () => {
  // 初始化平台开关 //  决定是否生成页面进行挂载
  // 检查当前网页 获取平台 //  "juejin.cn"   "www.zhihu.com"
  const platform = getPlatformNameTool(location.host)
  if (platform) {
    const res = await isOpen(platform)
    if (res) {
      await sleep(1) // 全局等待  延迟执行   可以防止 函数 在dom渲染前执行
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

injectFile()

window.addEventListener(
  "message",
  async function (event) {
    if (event.source != window) return
    if (event.data.type && event.data.type == "checkPlatform") {
      console.log("内容脚本接收到消息:", event.data.text)
      // 你可以在这里处理消息并进一步发送给service worker
      const res = await isOpen("bilibili")
      window.postMessage({ type: "check_result", text: res }, "*")
    }
  },
  false,
)
