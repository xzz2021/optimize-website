import React from "react"
import { createRoot } from "react-dom/client"
const root = createRoot(document.getElementById("popup")!) // 非空断言

const XzzPopup = () => {
  const aa = () => {
    // const id = chrome.runtime.id
    // const optionsUrl = `chrome-extension://${chrome.runtime.id}/options.html`
  }
  aa()

  const title = { fontSize: "16px", textAlign: "center" as const, margin: "5px" }
  const alink = {
    color: "cornflowerblue",
    textDecoration: "none",
  }
  return (
    <>
      <img src="http://xzz2022.top:2222/888.png" alt="" style={{ width: "100%" }} />
      <div style={title}>欢迎使用!</div>
      <div>
        进入
        <a href={`chrome-extension://${chrome.runtime.id}/options.html`} style={alink} target="_blank" rel="noopener noreferrer">
          选项设置页
        </a>
        可以自定义添加屏蔽块
      </div>
    </>
  )
}

root.render(XzzPopup())
