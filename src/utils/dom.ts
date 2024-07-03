import $ from "jquery"

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

export const removeRedirect = (linkArr: string[]) => {
  $("a").each(function () {
    let rawUrl = $(this).attr("href")
    if (!rawUrl) return // 如果 href 为空，则跳过
    for (let redirectUrl of linkArr) {
      if (rawUrl.includes(redirectUrl)) {
        const newUrl = rawUrl.replace(redirectUrl, "")
        // 掘金会转义链接  需解码
        const trueUrl = decodeURIComponent(newUrl)
        $(this).attr("href", trueUrl)
        break // 找到并替换后跳出内层循环
      }
    }
  })
}
