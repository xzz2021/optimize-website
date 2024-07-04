// import $ from "jquery"
// import { sleep } from "./tools"

/*  js文件 外部依赖  单纯  导入时  会被 tree shaking
  但是当文件内有函数引用此依赖时  其他未使用此依赖的函数被导出引用时  也会将依赖一并打包
*/

export const appendStyle = (cssContent: string) => {
  const style = document.createElement("style")
  style.textContent = cssContent
  const head = document.querySelector("head") as HTMLHeadElement
  head.appendChild(style)
}

export const rmNode2Style = (rmNode: string[]) => {
  if (!rmNode.length) return
  const style = rmNode.join(",") + "{display: none !important;}"
  appendStyle(style)
}
