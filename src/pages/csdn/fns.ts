import $ from "jquery"
import { sleep } from "@/utils/tools"
export const allowCopy = async () => {
  //   一键复制代码
  // await sleep(1)
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

export const styleCss = `.hljs-button-xzz{
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
}
  .forbid {
  -webkit-user-select:  auto !important;
      user-select: auto !important;
  }
    *{
     user-select: auto !important;
}
  }`

export const permitCopy = () => {
  // 解除页面所有复制限制
  document.querySelectorAll("*").forEach((item: any) => {
    item.oncopy = function (e: ClipboardEvent) {
      e.stopPropagation()
    }
  })
}

export const unfoldArticle = () => {
  //   自动展开  关注博主阅读全文
  $("#article_content").attr("style", "height:*px; overflow: auto;")
  $(".hide-article-box").remove()
  unfoldCodeBlocks()
}

const unfoldCodeBlocks = () => {
  // 自动展开代码块
  $(".set-code-hide").map((_index, item: any) => {
    // console.log("🚀 ~ xzz: unfoldCode -> item", item)
    item.setAttribute("style", "max-height: 9999px; height: auto;")
  })
}

//  移除重定向
export const removeRedirect = () => {
  $("#article_content a").map((_index, item: any) => {
    if (item.origin != window.location.origin) {
      item.onclick = (event: { stopPropagation: () => any }) => {
        event.stopPropagation && event.stopPropagation()
        item.setAttribute("target", "_blank")
      }
    }
  })
}

export const autoLoadPage = () => {
  if (location.host.includes("wenku")) {
    const articleDom = $(".article-box .cont.first-show.forbid")
    articleDom && articleDom.attr("class", "oiu")
    const occlusionDom = $(".article-box .open")
    occlusionDom && occlusionDom.attr("style", "display: none !important;")
  }
}
