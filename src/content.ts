import { isOpen, getPlatformArr, implementRmNode } from "@/utils/platformOperation"
import { createRoot } from "react-dom/client"
import { platFormObj } from "@/pages/index"
import { chromeStorage } from "./utils/chromeStorage"
import { removeRedirect } from "./utils/dom"
import { DEBUG } from "globals"
import { sleep } from "@/utils/tools"

// initStorage()

const linkArr = ["//link.zhihu.com/?target=https%3A", "https://link.juejin.cn?target="]
// https://link.juejin.cn?target=https%3A%2F%2Fjwt.io%2F
const startGenerate = async () => {
  // 初始化平台开关
  // initStorage()
  //  决定是否生成页面进行挂载
  // 检查当前网页 获取平台
  //  "juejin.cn"   "www.zhihu.com"
  const url = location.host
  const urlParts = url.split(".")
  const platform = urlParts[urlParts.length - 2]

  if (platform) {
    // 开发模式时  的  自动刷新
    if (DEBUG) {
      // 开发模式时为真   //   生产模式为假
      const { createWsConnect } = require("ws-reload-plugin")
      createWsConnect({})
    }
    //  检查平台开关是否启用
    const res = await isOpen(platform)
    if (res) {
      console.log("🚀 ~ file: content.ts:34 ~ res:", res)
      //  如果是开启状态  则生成页面
      const myapp = platFormObj[platform]()
      const uuid = Math.random().toString(12).slice(-8)
      createMountPage(myapp, platform + uuid)

      await sleep(1)
      //  直接实施 rmNode
      implementRmNode(platform)
      //  移除外链 中转 跳转
      removeRedirect(linkArr)
    }
  }
}

startGenerate()

const createMountPage = (myapp: JSX.Element, id: string) => {
  const el = document.querySelector("body")
  if (el) {
    el.insertAdjacentHTML("afterbegin", `<div id="${id}"></div>`)
    const root = createRoot(document.getElementById(id)!) // 非空断言
    root.render(myapp)
  }
}

const getStorage = async () => {
  const ee = await chromeStorage.get("platformNameArr")
  console.log("🚀 ~ file: content.ts:48 ~ ee:", ee)
}
getStorage()

getPlatformArr()
