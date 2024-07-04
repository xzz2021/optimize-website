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

// export const removeRedirect = async (linkArr: string[]) => {
//   await sleep(1)
//   $("a").each(function () {
//     let rawUrl = $(this).attr("href")
//     if (!rawUrl) return // 如果 href 为空，则跳过
//     if (!rawUrl.includes("link")) return

//     let rawUrl2 = fullDecodeURIComponent(rawUrl)
//     for (let redirectUrl of linkArr) {
//       if (rawUrl2.includes(redirectUrl)) {
//         rawUrl2 = rawUrl2.replace(redirectUrl, "")
//         if (!rawUrl2.includes("jianshu")) break
//       }
//     }
//     $(this).attr("href", rawUrl2)
//     // break // 找到并替换后跳出内层循环
//   })
// }

// //  简书  坑爹  内容可能 是爬的其他平台的  所以导致外链链接的还是外链
// //  多层嵌套url  完全解码
// const fullDecodeURIComponent = (url: string) => {
//   let decodedUrl = decodeURIComponent(url)
//   while (decodedUrl !== url) {
//     url = decodedUrl
//     decodedUrl = decodeURIComponent(url)
//   }
//   return decodedUrl
// }
