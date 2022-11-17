<template>
   <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
         <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <input
         type="text"
         placeholder="小明"
         v-model="searchKey"
         @keydown.enter="enterKey()"
      />
      <svg class="icon" aria-hidden="true" @click="enterKey()">
         <use xlink:href="#icon-search"></use>
      </svg>
   </div>
   <div class="searchHistory">
      <div class="historyLeft">
         <span class="spanInfo">历史</span>
         <span
            class="spanHistory"
            v-for="(item, index) in keyWordList"
            :key="index"
            @click="searchMusic(item)"
         >
            {{ item }}
         </span>
      </div>
      <div class="historyRight">
         <svg class="icon" aria-hidden="true" @click="deleteHistory()">
            <use xlink:href="#icon-shanchu"></use>
         </svg>
      </div>
   </div>
   <div class="musicListContext" v-if="searchList !== []">
      <div class="music" v-for="(item, index) in searchList" :key="index">
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
</template>

<script>
import { getSearchMusic } from "@/request/api/home.js";
import { mapMutations } from "vuex";

export default {
   data() {
      return {
         searchKey: "",
         keyWordList: [],
         searchList: [],
      };
   },
   mounted() {
      this.keyWordList = JSON.parse(localStorage.getItem("keyWordList")) || [];
   },
   methods: {
      async searchMusic(key) {
         let res = await getSearchMusic(key);
         this.searchList = res.data.result.songs;
      },
      async enterKey() {
         if (this.searchKey.trim() === "") return;
         this.keyWordList.unshift(this.searchKey.trim());
         this.keyWordList = [...new Set(this.keyWordList)];
         if (this.keyWordList.length > 5) {
            this.keyWordList.pop();
         }
         localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));

         this.searchMusic(this.searchKey);

         this.searchKey = "";
      },

      deleteHistory() {
         this.keyWordList = [];
         localStorage.removeItem("keyWordList");
      },
      playMusic(index) {
         this.updatePlayListIndex(index);
         this.updatePlayList(this.searchList);
      },
      ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
   },
};
</script>

<style lang="less" scoped>
.searchTop {
   width: 100%;
   height: 1rem;

   padding: 0 0.1rem;

   display: flex;
   align-items: center;
   input {
      width: 75%;
      height: 60%;
      margin-left: 0.2rem;
      margin-right: 0.3rem;
      padding: 0 0.15rem;
      border: none;
      border-bottom: solid 0.01rem #999;
   }
   .icon {
      width: 0.6rem;
      height: 0.6rem;
   }
}
.searchHistory {
   width: 100%;

   padding: 0.2rem;

   display: flex;
   justify-content: space-between;
   align-items: center;

   .historyLeft {
      height: 100%;
      overflow: hidden;
      .spanInfo {
         font-size: 0.4rem;
         font-weight: 800;
      }
      .spanHistory {
         padding: 0.1rem 0.2rem;
         background-color: #999;
         font-size: 0.3rem;
         border-radius: 0.4rem;
         margin: 0.1rem 0.1rem;
         display: inline-block;
      }
   }
   .historyRight {
      height: 100%;
      display: flex;
      align-items: center;
      .icon {
         width: 0.5rem;
         height: 0.5rem;
      }
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

      &:first-child {
         border-top: solid 0.01rem rgba(0, 0, 0, 0.1);
      }

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

               font-size: 0.25rem;
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
</style>