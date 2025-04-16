import { injectForBilibili } from "./utils/injectFn"

const exeFn = async () => {
  if (location.href.includes("bilibili.com/video") || location.href.includes("bilibili.com/list")) {
    window.postMessage({ type: "checkPlatform", text: "你好,帮我检查b站平台是否开启!" }, "*")
    window.addEventListener(
      "message",
      async function (event) {
        if (event.source != window) return
        if (event.data.type && event.data.type == "check_result") {
          const res = event.data.text
          if (res) {
            injectForBilibili()
          }
        }
      },
      false,
    )
  }
}

exeFn()
