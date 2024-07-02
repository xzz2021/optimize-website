import React from "react"
import { createRoot } from "react-dom/client"
import App from "./list"
const root = createRoot(document.getElementById("options")!) // 非空断言

const XzzOptions: React.FC = () => {
  return (
    <>
      <App />
    </>
  )
}

root.render(<XzzOptions />)
