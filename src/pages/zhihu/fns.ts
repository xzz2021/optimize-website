import { appendStyle } from "@/utils/dom"
import $ from "jquery"

export const removeLimit = () => {
  // 解除知乎登录才能查看完整内容的限制
  $('div[class*="RichContent--unescapable"]').each(function () {
    // 获取当前元素的所有类名
    const classNames = $(this).attr("class")!.split(" ")
    // 过滤出不包含 RichContent--unescapable 的类名
    const newClassNames = classNames.filter(function (className) {
      return className !== "RichContent--unescapable"
    })
    // 更新元素的类名
    $(this).attr("class", newClassNames.join(" "))
  })
}

const styleCss = `.RichContent-inner{
  -webkit-mask-image: none !important;
  mask-image: none !important;
}`
appendStyle(styleCss)

const isExist = (dom: string) => {
  return $(dom).length != 0
}
const removeLogins = () => {
  // 移除知乎登录
  isExist(".Modal-closeButton") && $(".Modal-closeButton").trigger("click")
  // 宽度由问题页父元素Question-main 决定
  isExist(".Question-mainColumn") && $(".Question-mainColumn").css("width", "100%") // 主题内容宽度重置为100%
  // 知乎热点页面判断
  isExist(".Question-main") && isExist(".ContentItem-actions") && $(".ContentItem-actions").css("width", "100%") // 底栏和主题内容同宽
  isExist(".AuthorInfo") && $(".AuthorInfo").css("max-width", "1000px")
  // setTimeout(() => checkExistHide('.css-1hwwfws') , 800)  //顶部登录浮窗  出现比较晚,所以需要延迟移除
}

removeLogins()
