import React from "react"
import { createRoot } from "react-dom/client"
const root = createRoot(document.getElementById("popup")!) // 非空断言

const XzzPopup = () => {
  return (
    <>
      <img src="http://xzz2022.top:2222/888.png" alt="" style={{ width: "100%" }} />
      <div>欢迎使用!</div>
      <div></div>
    </>
  )
}

root.render(XzzPopup())
