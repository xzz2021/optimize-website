import React from "react"
import { createRoot } from "react-dom/client"
import WelcomeFeature from "./list"
const root = createRoot(document.getElementById("popup")!) // 非空断言

root.render(<WelcomeFeature />)
