// 此文件定义 全平台都会执行的  公共函数

import { removeRedirect } from "@/utils/jquery"
import { implementRmNode } from "@/utils/platformOperation"
import { createRoot } from "react-dom/client"
import { platFormObj } from "@/pages/index"
const linkArr = ["https://link.zhihu.com/?target=", "https://link.juejin.cn?target=", "https://links.jianshu.com/go?to="]

export const commonFn = (platform: string) => {
  //  直接实施 rmNode
  implementRmNode(platform)
  //  移除外链 中转 跳转
  removeRedirect(linkArr)

  //  如果是开启状态  则生成  待嵌入的页面
  const Myapp = platFormObj[platform] || platFormObj["tmp"]
  const uuid = Math.random().toString(12).slice(-8)
  createMountPage(Myapp, platform + uuid)
}

const createMountPage = (Myapp: () => JSX.Element, id: string) => {
  const el = document.querySelector("body")
  if (el) {
    el.insertAdjacentHTML("afterbegin", `<div  style="position: fixed;" id="${id}"></div>`)
    const root = createRoot(document.getElementById(id)!) // 非空断言
    root.render(Myapp())
  }
}
