//  此文件里的函数如果执行  会在导入时就运行
import { sleep } from "@/utils/tools"
import $ from "jquery"

export const removeLimit = async () => {
  console.log("✨ 🍰 ✨ xzz2021:=============================removeLimit")
  $(".Modal-closeButton").length != 0 && $(".Modal-closeButton").trigger("click")

  await sleep(0.1)
  // // 解除知乎登录才能查看完整内容的限制
  // $('div[class*="RichContent--unescapable"]').each(function () {
  //   // 获取当前元素的所有类名
  //   const classNames = $(this).attr("class")!.split(" ")
  //   // 过滤出不包含 RichContent--unescapable 的类名
  //   const newClassNames = classNames.filter(function (className) {
  //     return className !== "RichContent--unescapable"
  //   })
  //   // 更新元素的类名
  //   $(this).attr("class", newClassNames.join(" "))
  // })
  // 自动点击展开所有内容
  $(".RichContent-inner").each(function () {
    $(this).trigger("click")
    // $(this).attr("style", "")
  })

  //  移除知乎的直答跳转
  $(".RichContent-EntityWord").each(function () {
    //  获取当前元素的文本
    const text = $(this).text()
    // 替换当前元素为span
    $(this).replaceWith(`<span>${text}</span>`)
  })
}

export const styleCss = `
.RichContent.is-collapsed .RichContent-inner:hover {
  color: black !important;
}
.Modal-wrapper .Modal-inner {
  display: none !important;
}
.Question-mainColumn, .ContentItem-actions .ContentItem-actions {
  width: 100% !important;
}
.AuthorInfo {
  max-width: 1000px !important;
}
  
.Post-NormalMain .Post-Header {
  width: 1000px !important;
}
.Post-NormalMain>div, .Post-NormalSub>div {
  width: 1000px !important;
}
.Post-SideActions {
  right: calc(40vw - 495px);
}
`
