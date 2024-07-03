import React from "react"
import Zhihu from "./zhihu"
import Bilibili from "./bilibili"
import Csdn from "./csdn"
import Juejin from "./juejin"
import JianShu from "./jianshu"

/*
React的引入 只在jsx文件中  可以解析
*/
//  给一个空模版  用于动态 平台 挂载
function Tmp(): React.JSX.Element {
  return <></>
}

type PlatFormObj = {
  [key: string]: () => JSX.Element
}
export const platFormObj: PlatFormObj = {
  zhihu: Zhihu,
  bilibili: Bilibili,
  csdn: Csdn,
  juejin: Juejin,
  jianshu: JianShu,
  tmp: Tmp,
}
