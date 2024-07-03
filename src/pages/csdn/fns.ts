import { appendStyle } from "@/utils/dom"
import $ from "jquery"
import { sleep } from "@/utils/tools"
export const allowCopy = async () => {
  //   一键复制代码
  await sleep(1)
  $("pre").each(function () {
    //  解除自由复制
    $(this).attr("style", "user-select: auto;")
    $(this).children("code").attr("style", "user-select: auto;")
    //  实现一键复制
    $(this).find(".hljs-button").replaceWith('<div class="hljs-button-xzz" >一键复制</div>')
    let copyBtn = $(this).find(".hljs-button-xzz")
    copyBtn.on("click", function () {
      // dom结构判断       //  向上寻找祖先元素                   // 查找同层兄弟元素
      let existDom = $(this).closest("code").length == 0 ? $(this).siblings("code") : $(this).closest("code")
      let allCode = existDom[0].innerText.replace("\n\n一键复制", "") //  获取到当前块所有代码内容
      navigator.clipboard.writeText(allCode) //   复制到剪切板
      console.log("🚀 ~ file: fns.ts:19 ~ 复制成功:")
      copyBtn.text("复制成功^_^")
      setTimeout(() => {
        copyBtn.text("一键复制")
      }, 2000)
    })
  })
}

const styleCss = `.hljs-button-xzz{
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 12px;
  color: #ffffff;
  background-color: #9999AA;
  padding: 2px 8px;
  margin: 8px;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.05);
}`
appendStyle(styleCss)

interface Element {
  oncopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null
}

const permitCopy = () => {
  console.log("🚀 ~ file: fns.ts:55 ~ permitCopy:")
  // 解除页面所有复制限制
  document.querySelectorAll("*").forEach((item: Element) => {
    item.oncopy = function (e: ClipboardEvent) {
      e.stopPropagation()
    }
  })
}

const unfoldArticle = () => {
  //   自动展开  关注博主阅读全文
  $("#article_content").attr("style", "height:*px; overflow: auto;")
  $(".hide-article-box").remove()
}

//  移除重定向
const removeRedirect = () => {
  $("#article_content a").map((index, item) => {
    if (item.origin != window.location.origin) {
      item.onclick = event => {
        event.stopPropagation && event.stopPropagation()
        item.setAttribute("target", "_blank")
      }
    }
  })
}

permitCopy()
unfoldArticle()
removeRedirect()
