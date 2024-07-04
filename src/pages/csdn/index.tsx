import React from "react"
import { allowCopy, permitCopy, removeRedirect, styleCss, unfoldArticle } from "./fns"
import { appendStyle } from "@/utils/dom"
export default function Csdn() {
  allowCopy()
  appendStyle(styleCss)
  permitCopy()
  unfoldArticle()
  removeRedirect()

  return (
    <div>
      <h1>csdn324</h1>
    </div>
  )
}
