import React from "react"
import { createRoot } from "react-dom/client"
const root = createRoot(document.getElementById("popup")!) // 非空断言

const XzzOptions = () => {
  return <div>options</div>
}

root.render(XzzOptions())
