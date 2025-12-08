import { chromeStorage } from "@/utils/chromeStorage"
import $ from "jquery"


//  自动点击 试用高清
export const autoHD = async () => {
  // 第一次进入页面 直接执行一次
  clickHD()

  //  监听url变化
  checkUrl()

  // 瀑布流加载滚动时执行
  removeItem()


  checkHight()

}




const removeItem = async () => {
  const url = window.location.href
  if(url.includes("/video/"))return 
  const localListLength = await chromeStorage.get("listLength") as number
  const list = $(".bili-video-card")
  if(list.length == localListLength) return
  const localList = await chromeStorage.get("localList") as string[] || []
	console.log("TCL: removeItem======= -> localList", localList)
  $('.floor-single-card').each(function(){
    $(this).remove()
  })
  list.each(   function () {
    const authorDom = $(this).find(".bili-video-card__info--author")
    if(authorDom.attr("hadflag") == "true") return
    // 使用$ 创建一个dom
    const newDom = $('<div style="z-index: 99999; cursor: pointer; background: #ea4f87; color: white; text-align: center; margin-left: 15px">屏蔽</div>')
    authorDom.parent().parent().append(newDom)
    authorDom.attr("hadflag", "true")
    const authorName = authorDom?.text()
    // 给newDom添加点击事件 点击后 删除当前dom
    newDom.on("click", async () => {
      chromeStorage.set({localList: [...localList, authorName]}) 
    const ll = await chromeStorage.get("listLength") as number
        
      chromeStorage.set({listLength: ll - 1})
      $(this).hide()
    })
    if(localList.includes(authorName)){
      $(this).hide()
    // const ll = await chromeStorage.get("listLength") as number
    //   chromeStorage.set({listLength: ll - 1})
    }

  })

}
const clickHD = () => {
  if (validUrl()) {
    const timer4Btn = setInterval(async () => {
      const trialBtn = document.querySelector(".bpx-player-toast-confirm-login")
      if (trialBtn && trialBtn instanceof HTMLElement) {
        trialBtn.click()
        clearInterval(timer4Btn)
      }else{
        window.localStorage.clear()
      }
    }, 1000)
  }
}

const validUrl = () => {
  const re = /https:\/\/www\.bilibili\.com\/video\/.*/
  const re2 = /https:\/\/www\.bilibili\.com\/list\/.*/
  return re.test(window.location.href) || re2.test(window.location.href)
}

const checkUrl = () => {
  let oldHref = window.location.href

  const timer4Url = setInterval(() => {
    const newHref = window.location.href
    if (newHref == oldHref) return
    oldHref = newHref
    if (validUrl()) {
      clearInterval(timer4Url)
      window.location.reload()
    }
  }, 1500)
}


//  监听暂停播放事件 如果是由space键暂停的  或者click 事件触发的 则跳过
const onListenPause = (isPauseByUser: boolean) => {

  
}
export const checkStop = () => {
  const video = document.querySelector("video")
  if(!video) return
  window.addEventListener('keydown', (event)=> {
    const video = document.querySelector("video")
  if(!video) return
  const isPauseByUser = !video.paused
    // 先确定播放状态
    if(event.code === 'Space') {
      chromeStorage.set({isPauseByUser })
    }
  })
  video.addEventListener('click', (event)=> {
    const video = document.querySelector("video")
    if(!video) return
    const isPauseByUser = !video.paused
    chromeStorage.set({isPauseByUser })
  })
  // setInterval(async () => {
  //   const isPauseByUser = await chromeStorage.get("isPauseByUser") as boolean
  //   if(isPauseByUser) return
  //   const video = document.querySelector("video")
  //   if(!video) return
  //   if(video.paused) {
  //     video.play()
  //   }
  // }, 1000)
}


const checkHight = () => {
  // 1. 如果是首页  先执行一次  再监听滚动 如果滚动超过500px 且列表长度不一致 则执行一次
  if(window.location.host == 'www.bilibili.com') {

    removeItem()
      autoHighLight()
    let oldHeight = document.documentElement.scrollHeight
    let isLock = false
    // 监听滚动事件
    window.addEventListener('scroll', async(event) => {
      // 获取完整视窗内容高度
      const newHeight = document.documentElement.scrollHeight
      if(newHeight !=  oldHeight && !isLock) {
        isLock = true
        await removeItem()
        await autoHighLight()
        oldHeight = newHeight
        isLock = false
      }

    })
    return 
  }
  //  2. 如果不是首页 只是列表页  则直接执行  如果url变化则再次执行
  let oldHref = window.location.href
  if(window.location.host == 'search.bilibili.com') {
    autoHighLight()
    window.setInterval(() => {
      const newHref = window.location.href
      if(newHref != oldHref) {
        oldHref = newHref
        autoHighLight()
      }
    }, 2000)
    return
  }
}

const autoHighLight = async () => {
	// console.log("TCL: autoHighLight -> autoHighLight")
  // 获取所有类名是bili-video-card__wrap
  const playCountLimit  =   await chromeStorage.get("playCountLimit") as number ?? 50
	console.log("TCL: autoHighLight -> playCountLimit", playCountLimit)
  if(playCountLimit == 0) return
  const videoCards = $(".bili-video-card__wrap")
  videoCards.each(function() {
    const videoCard = $(this)
    let playCount = videoCard.find(".bili-video-card__stats--item .bili-video-card__stats--text")
		if(!playCount || playCount.length === 0) playCount =  videoCard.find(".bili-video-card__stats--item span")
    const playCountText = playCount.text()
    if(playCountText.includes("万")) {
      const playCountNumber = parseInt(playCountText.replace("万", "")) 
      const isLimit = playCountNumber >= playCountLimit
      if(isLimit) {
        videoCard.css("border", "3px solid #ea4f87")
      }else{
        videoCard.css("border", "none")
      }
    }
  })
}

