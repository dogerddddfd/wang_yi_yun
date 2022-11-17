<template>
   <div class="musicList">
      <div class="musicTop">
         <div class="title">发现好歌单</div>
         <div class="more">查看更多</div>
      </div>
      <div class="musicContent">
         <van-swipe
            :loop="false"
            :width="150"
            class="musicSwpie"
            :show-indicators="false"
         >
            <van-swipe-item v-for="item in state.musicList" :key="item.id">
               <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
                  <img :src="item.picUrl" alt="item.name" />
                  <div class="playCount">
                     <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang1"></use>
                     </svg>
                     <span>{{ changeCount(item.playCount) }}</span>
                  </div>
                  <span class="name">{{ item.name }}</span>
               </router-link>
            </van-swipe-item>
         </van-swipe>
      </div>
   </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { getMusicList } from "@/request/api/home";
export default {
   setup() {
      // data
      const state = reactive({
         musicList: [],
      });
      // methods
      function changeCount(num) {
         if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + "亿";
         } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + "万";
         }
      }

      onMounted(async () => {
         const { data: res } = await getMusicList();
         state.musicList = res.result;
      });

      return {
         // data
         state,
         // methods
         changeCount,
      };
   },
};
</script>

<style lang="less" scoped>
.musicList {
   width: 100%;
   height: 5rem;
   padding: 0.02rem;
   .musicTop {
      width: 100%;
      height: 0.6rem;
      display: flex;
      justify-content: space-between;
      margin-block: 0.2rem;
      .title {
         margin-left: 0.1rem;
         font-size: 0.4rem;
         font-weight: 900;
      }
      .more {
         margin-right: 0.1rem;
         border: solid #ccc 0.02rem;
         text-align: center;
         line-height: 0.6rem;
         padding: 0 0.2rem;
         border-radius: 0.4rem;
      }
   }

   .musicContent {
      width: 100%;
      height: 4rem;
      .musicSwpie {
         height: 100%;
         position: relative;
         img {
            border-radius: 0.3rem;
            padding: 5px;
            width: 100%;
            height: 3rem;
         }
         .playCount {
            display: inline;
            height: 0.5rem;
            padding: 0.2rem;
            position: absolute;
            right: 0;
            color: white;
            .icon {
               height: 0.25rem;
               color: #ccc;
            }
            span {
               font-size: 0.3rem;
               line-height: 0.3rem;
            }
         }
         .name {
            width: 100%;
            font-size: .25rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            word-break: break-all;
            -webkit-box-orient: vertical;
         }
      }
   }
}
</style>