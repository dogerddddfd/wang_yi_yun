import { createStore } from 'vuex'
import {getMusicLyric} from "@/request/api/item.js"

export default createStore({
  state: {
    // 播放列表
    playList: [{
      // 专辑
      al: {
        id:2897081,
        name:'1965',
        picUrl: "https://p1.music.126.net/gse6x81HSUvPR83H1ACI_A==/5990139348552924.jpg",
        pic:5990139348552924
      },
      // 作者
      ar:[{
        id:900106,
        name:"Zella Day"
      }],
      // 歌单名
      name: "1965",
      // 歌单id
      id:28798452,

    }],
    lyricList:{},//歌词
    currentTime:0,//播放时间
    playListIndex:0,//默认下标为0
    isStopBtnShow:true,//播放暂停显示
    detailShow:false,//歌曲详情页显示
    duration:0,//歌曲时长
  },
  getters: {

  },
  mutations: {
    updateStopBtnShow:function(state,value){
      state.isStopBtnShow=value
    },
    updatePlayList:function(state,value){
      state.playList=value
    },
    updatePlayListIndex(state,value){
      state.playListIndex=value
    },
    updateDetailShow(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList(state,value){
      state.lyricList=value
    },
    updateCurrentTime(state,value){
      state.currentTime=value
    },
    updateDuration(state,value){
      state.duration=value
    }
  },
  actions: {
    getLyric:async function(context,value){
      let res = await getMusicLyric(value)
      context.commit('updateLyricList',res.data.lrc)
    }
  },
  modules: {
  }
})
