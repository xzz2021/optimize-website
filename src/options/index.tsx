import React from "react"
import { createRoot } from "react-dom/client"
import List from "./list"
const root = createRoot(document.getElementById("options")!) // 非空断言

const XzzOptions: React.FC = () => {
  return (
    <>
      <List />
    </>
  )
}

root.render(<XzzOptions />)
