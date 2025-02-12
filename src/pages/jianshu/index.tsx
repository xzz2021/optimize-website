import React from "react"
import { allowCopy, beautifyPage, styleCss } from "./fns"
import { appendStyle } from "@/utils/dom"
const JianShu = () => {
  allowCopy()
  beautifyPage()
  appendStyle(styleCss)
  return <div>{/* <h1>简书324</h1> */}</div>
}
JianShu.cnName = "简书"
export default JianShu
