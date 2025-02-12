import React from "react"
import { allowCopy, styleCss } from "./fns"
import { appendStyle } from "@/utils/dom"
const Juejin = () => {
  allowCopy()
  appendStyle(styleCss)

  return <div>{/* <h1>掘金324</h1> */}</div>
}
Juejin.cnName = "掘金"
export default Juejin
