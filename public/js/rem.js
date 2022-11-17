function remSize(){
   // 获取设备宽度
   var deviceWidth=document.documentElement.clientWidth || window.innerWidth
   // 最大750
   if(deviceWidth >= 750){
      deviceWidth = 750
   }
   // 最小320
   if(deviceWidth <= 320){
      deviceWidth = 320
   }
   // 1rem大小:deviceWidth/7.5
   document.documentElement.style.fontSize=(deviceWidth/7.5)+'px'
   // 字体大小
   document.querySelector('body').style.fontSize=0.3+'rem'
}

window.onresize=function(){
   // 窗口发生变化
   remSize()
}