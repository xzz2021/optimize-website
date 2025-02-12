import React from "react"
import { autoHD, closeDm } from "./fn"

const Bilibili = () => {
  autoHD()
  closeDm()
  return <div>{/* <h1>Bilibili</h1> */}</div>
}
Bilibili.cnName = "哔哩哔哩"
export default Bilibili
