import React from "react"
import { removeLimit, removeLogins, styleCss } from "./fns"
import { appendStyle } from "@/utils/dom"
export default function Zhihu() {
  removeLimit()
  removeLogins()
  appendStyle(styleCss)

  return <div>{/* <h1>知乎324</h1> */}</div>
}
