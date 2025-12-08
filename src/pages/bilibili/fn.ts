import { chromeStorage } from "@/utils/chromeStorage"
import $ from "jquery"


//  自动点击 试用高清
export const autoHD = async () => {
  // 第一次进入页面 直接执行一次
  clickHD()

  const oldHref = window.location.href
  //  监听url变化
  checkUrl(oldHref)

  closeDanmu()
  // 瀑布流加载滚动时执行
  removeItem()

  checkStop()

}

const closeDanmu = () => {
  const aaa = setInterval(()=> {
    const isOpen = document.querySelector('.bpx-player-dm-setting.disabled')
  if(isOpen && isOpen instanceof HTMLElement){
    isOpen.click()
    clearInterval(aaa)
  }
  }, 2000)
}


const removeItem = async () => {
  const url = window.location.href
  if(url.includes("/video/"))return 
    setTimeout(() => {
      removeItem()
}, 2000)
  const localListLength = await chromeStorage.get("listLength") as number
  const list = $(".bili-video-card")
  if(list.length == localListLength) return
  const localList = await chromeStorage.get("localList") as string[] || []
	console.log("TCL: removeItem -> localList", localList)
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
        clearInterval(timer4Btn)
        trialBtn.click()
      }else{
        window.localStorage.clear()
      }
    }, 1000)
  }
}

// export const fullscreen = () => {
//   const playerWrapper = document.querySelector(".bpx-player-video-wrap")

//   const video = playerWrapper?.querySelector("video")
//   console.log("🚀 ~ fullscreen ~ video:", video)
//   video?.requestFullscreen()
//   return
//   if (!video) return
//   console.log("✨ 🍰 ✨ xzz2021: fullscreen -> video", video)
//   // 全屏切换函数
//   if (
//     document.fullscreenElement ||
//     document.webkitFullscreenElement ||
//     document.mozFullScreenElement ||
//     document.msFullscreenElement
//   ) {
//     // 如果当前已经是全屏模式，则退出全屏
//     if (document.exitFullscreen) {
//       document.exitFullscreen()
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen()
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen()
//     } else if (document.msExitFullscreen) {
//       document.msExitFullscreen()
//     }
//   } else {
//     // 如果当前不是全屏模式，则进入全屏
//     if (video.requestFullscreen) {
//       video.requestFullscreen()
//     } else if (video.webkitRequestFullscreen) {
//       video.webkitRequestFullscreen()
//     } else if (video.mozRequestFullScreen) {
//       video.mozRequestFullScreen()
//     } else if (video.msRequestFullscreen) {
//       video.msRequestFullscreen()
//     }
//   }
// }
const validUrl = () => {
  const re = /https:\/\/www\.bilibili\.com\/video\/.*/
  const re2 = /https:\/\/www\.bilibili\.com\/list\/.*/
  return re.test(window.location.href) || re2.test(window.location.href)
}

const checkUrl = (oldHref: string) => {
  const timer4Url = setInterval(() => {
    const newHref = window.location.href
    if (newHref === oldHref) return
    if (validUrl()) {
      clearInterval(timer4Url)
      window.location.reload()
    }
  }, 1000)
}

// 自动关闭 弹幕
export const closeDm = () => {
  const timer4Btn: NodeJS.Timeout = setInterval(async () => {
    const hasdm = document.querySelector(".bpx-player-dm-setting.disabled")
    if (hasdm) return clearInterval(timer4Btn)
    const trialBtn = document.querySelector(".bui-danmaku-switch-input")
    if (trialBtn && trialBtn instanceof HTMLElement) {
      clearInterval(timer4Btn)
      trialBtn.click()
    }
  }, 1000)
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

// export const checkPlay = () => {
//   // 获取视频的播放状态
//   const video = $("#bilibili-player video")
//   if (video.length > 0) {
//     const playState = video[0]?.paused
//     if (playState) {
//       video.trigger("play")
//     }
//   }
// }
