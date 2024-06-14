import { isOpen, initStorage } from "@/utils/checkPlatform"
import { createRoot } from "react-dom/client"
import { platFormObj } from "@/pages/index"

const startGenerate = async () => {
  // 初始化平台开关
  initStorage()
  //  决定是否生成页面进行挂载
  // 检查当前网页 获取平台
  let platform
  const url = location.href
  const currentPaltform = url.match(/www\.(.*?)\.com/)
  if (currentPaltform) {
    platform = currentPaltform[1]
  }

  if (platform) {
    // 开发模式时  的  自动刷新
    if (DEBUG) {
      // 开发模式时为真   //   生产模式为假
      const { createWsConnect } = require("ws-reload-plugin")
      createWsConnect({})
    }
    //  检查平台开关是否启用
    const res = await isOpen(platform)
    if (!res) {
      //  如果是开启状态  则生成页面
      const myapp = platFormObj[platform]()
      const uuid = Math.random().toString(12).slice(-8)
      createMountPage(myapp, platform + uuid)
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
