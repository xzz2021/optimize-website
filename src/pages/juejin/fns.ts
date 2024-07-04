import $ from "jquery"
import { sleep } from "@/utils/tools"
export const allowCopy = async () => {
  //   一键复制代码
  await sleep(1)
  $("pre").each(function () {
    let copyBtn = $(this).find(".code-block-extension-copyCodeBtn")
    copyBtn.attr("onclick", "").unbind("click") //  移除原本点击事件无效
    $("html, body").css("overflow", "auto") // 移除原生弹框出现后的body hidden
    copyBtn.text("一键复制")
    copyBtn.attr("class", "code-block-extension-copyCodeBtn-xzz") //   复制代码按钮 替换类名
    copyBtn.on("click", function () {
      // $(this).attr('onclick','').unbind('click')
      let allCode = $(this).closest("pre").children("code")[0].innerText.replace("\n\n一键复制", "") //  获取到当前块所有代码内容
      navigator.clipboard.writeText(allCode) //   复制到剪切板
      // messageApi.open({ content: "复制成功!!!", type: "success" })
      console.log("🚀 ~ file: fns.ts:19 ~ 复制成功:")
      copyBtn.text("复制成功^_^")
      setTimeout(() => {
        copyBtn.text("一键复制")
      }, 2000)
    })
  })
}

export const styleCss = `.code-block-extension-copyCodeBtn-xzz{
  font-size: 12px;
  margin-left: 10px;
  cursor: pointer;
  color: hsla(0,0%,54.9%,.8);
  transition: color .1s;
}`
