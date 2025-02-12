import React from "react"
import { removeLimit, removeLogins, styleCss } from "./fns"
import { appendStyle } from "@/utils/dom"
const Zhihu = () => {
  removeLimit()
  removeLogins()
  appendStyle(styleCss)

  return <div>{/* <h1>知乎32---==47---6</h1> */}</div>
}
Zhihu.cnName = "知乎"
export default Zhihu
