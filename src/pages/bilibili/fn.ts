//  自动点击 试用高清
export const autoHD = async () => {
  const re = /https:\/\/www\.bilibili\.com\/video\/.*/
  const re2 = /https:\/\/www\.bilibili\.com\/list\/.*/
  const oldHref = window.location.href
  const timer4Url = setInterval(() => {
    const newHref = window.location.href
    if (newHref === oldHref) return
    if (re.test(newHref) || re.test(oldHref) || re2.test(newHref) || re2.test(oldHref)) {
      clearInterval(timer4Url)
      window.location.reload()
    }
  }, 1000)

  const timer4Btn = setInterval(async () => {
    const trialBtn = document.querySelector(".bpx-player-toast-confirm-login")
    if (trialBtn) {
      clearInterval(timer4Btn)
      trialBtn.click()
    }
  }, 1000)
}
