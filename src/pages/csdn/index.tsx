import React from "react"
import { allowCopy, permitCopy, removeRedirect, styleCss, unfoldArticle, autoLoadPage } from "./fns"
import { appendStyle } from "@/utils/dom"
export default function Csdn() {
  allowCopy()
  appendStyle(styleCss)
  permitCopy()
  unfoldArticle()
  removeRedirect()
  autoLoadPage()

  return (
    <div>
      <h1>csdn324</h1>
    </div>
  )
}
