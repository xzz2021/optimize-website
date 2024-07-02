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

// https://link.zhihu.com/?target=https%3A//github.com/livoras/blog/issues/13
//link.zhihu.com/?target=http%3A
export const removeRedirect = (linkArr: string[]) => {
  $("a").each(function () {
    let rawUrl = $(this).attr("href")
    if (!rawUrl) return // 如果 href 为空，则跳过
    for (let redirectUrl of linkArr) {
      if (rawUrl.includes(redirectUrl)) {
        const newUrl = rawUrl.replace(redirectUrl, "")
        $(this).attr("href", newUrl)
        break // 找到并替换后跳出内层循环
      }
    }
  })
}
