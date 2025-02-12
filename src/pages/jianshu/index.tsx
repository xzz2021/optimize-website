import React from "react"
import { allowCopy, beautifyPage, styleCss } from "./fns"
import { appendStyle } from "@/utils/dom"
export default function JianShu() {
  allowCopy()
  beautifyPage()
  appendStyle(styleCss)
  return <div>{/* <h1>简书324</h1> */}</div>
}
