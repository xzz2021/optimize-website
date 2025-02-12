import React from "react"
import { allowCopy, styleCss } from "./fns"
import { appendStyle } from "@/utils/dom"
export default function Juejin() {
  allowCopy()
  appendStyle(styleCss)

  return <div>{/* <h1>掘金324</h1> */}</div>
}
