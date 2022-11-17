import service from ".."

// 轮播图
export function getBanner() {
   return service({
      method: 'GET',
      url: '/banner?type=2'
   })
}

//每日歌单
export function getMusicList(){
   return service({
      method:"GET",
      url:'/personalized?limit=10'
   })
}

// 搜索
export function getSearchMusic(data){
   return service({
      method:'GET',
      url:`/search?keywords=${data}`
   })
}