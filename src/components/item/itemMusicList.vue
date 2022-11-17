<template>
   <div class="musicList">
      <div class="musicListHeader">
         <div class="itemLeft" @click="playMusic(0)">
            <svg class="icon" aria-hidden="true" @click="">
               <use xlink:href="#icon-bofang2"></use>
            </svg>
            <div class="spanInfo" >
               <span class="playAll">播放全部</span>
               <span class="count">(共{{ trackCount }}曲)</span>
            </div>
         </div>
         <div class="itemRight">+ 收藏{{ subscribedCount }}</div>
      </div>
      <div class="musicListContext">
         <div class="music" v-for="(item, index) in itemList" :key="index">
            <div class="musicLeft" @click="playMusic(index)">
               <div class="index">{{ index + 1 }}</div>
               <div class="musicInfo">
                  <div class="title">{{ item.name }}</div>
                  <div class="author">{{ item.ar[0].name }}</div>
               </div>
            </div>
            <div class="musicRight">
               <svg
                  v-show="item.mv !== 0"
                  class="icon"
                  aria-hidden="true"
                  @click=""
               >
                  <use xlink:href="#icon-bofangqi-bofangxiaodianshi"></use>
               </svg>
               <svg class="icon" aria-hidden="true" @click="">
                  <use xlink:href="#icon-liebiao2"></use>
               </svg>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
   setup(props) {
   },
   props: ["itemList", "subscribedCount", "trackCount"],
   methods:{
      playMusic(index){
         this.updatePlayListIndex(index)
         this.updatePlayList(this.itemList)
      },
      ...mapMutations(['updatePlayList','updatePlayListIndex']),
   }
};
</script>

<style lang="less" scoped>
.musicList {
   width: 100%;
   height: 10rem;
   background-color: #fff;
   border-radius: 0.25rem 0.25rem 0 0;
   .musicListHeader {
      width: 100%;
      height: 1.05rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: solid 0.01rem rgba(0, 0, 0, 0.1);

      .itemLeft {
         height: 100%;
         width: 3rem;
         display: flex;
         justify-content: space-between;
         align-items: center;
         .icon {
            width: 0.5rem;
            height: 0.5rem;
            margin: 0 0 0 0.2rem;
         }
         .spanInfo {
            .playAll {
               font-size: 0.3rem;
               font-weight: 600;
            }
            .count {
               font-size: 0.1rem;
               color: rgba(190, 190, 190, 0.836);
            }
         }
      }
      .itemRight {
         height: 85%;
         width: 2.5rem;
         margin: 0.2rem 0.2rem;

         border-radius: 0.5rem;
         background-color: red;
         box-shadow: 0.01rem 0.01rem 0.01rem 0.01rem rgba(0, 0, 0, 0.2);
         color: #fff;

         display: flex;
         justify-content: center;
         align-items: center;
      }
   }
   .musicListContext {
      .music {
         width: 100%;
         height: 1.4rem;
         border-bottom: solid 0.01rem rgba(0, 0, 0, 0.1);
         background-color: #fff;

         display: flex;
         justify-content: space-between;
         align-items: center;

         .musicLeft {
            height: 100%;
            width: 70%;
            display: flex;
            display: flex;
            align-items: center;
            .index {
               height: 100%;
               width: 15%;
               text-align: center;

               line-height: 1.4rem;
            }
            .musicInfo {
               width: 90%;
               height: 100%;

               .title {
                  height: 50%;
                  width: 100%;

                  line-height: 1rem;
                  font-weight: 700;

                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  word-break: break-all;
                  -webkit-box-orient: vertical;
               }
               .author {
                  height: 50%;
                  width: 100%;

                  font-size: .25rem;
                  line-height: 0.5rem;
                  color: rgb(177, 177, 177);

                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  word-break: break-all;
                  -webkit-box-orient: vertical;
               }
            }
         }
         .musicRight {
            height: 100%;
            width: 30%;
            display: flex;
            justify-content: end;
            align-items: center;
            .icon {
               width: 0.5rem;
               height: 0.5rem;
               margin: 0 0.2rem;
               fill: rgb(177, 177, 177);
            }
         }
      }
   }
}
</style>