<template>
   <img :src="musicList.al.picUrl" alt="" class="bgImg" />
   <div class="detailTop">
      <div class="topLeft">
         <svg
            class="icon backfore"
            aria-hidden="true"
            @click="
               isLyricShow = false;
               updateDetailShow();
            "
         >
            <use xlink:href="#icon-zuojiantou"></use>
         </svg>
         <div class="info">
            <Vue3Marquee class="musicName">{{ musicList.name }}</Vue3Marquee>
            <span class="authorName">{{ musicList.ar[0].name }}</span>
            <svg class="icon" aria-hidden="true" @click="">
               <use xlink:href="#icon-xiayiye"></use>
            </svg>
         </div>
      </div>
      <div class="topRight">
         <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-fenxiang"></use>
         </svg>
      </div>
   </div>
   <div class="detailContent">
      <div class="cd" v-show="!isLyricShow">
         <img
            src="@/assets/needle-ab.png"
            alt=""
            class="img_needle"
            :class="{ 'img_needle--active': !isStopBtnShow }"
         />
         <img
            src="@/assets/cd.png"
            alt=""
            class="img_cd"
            @click="isLyricShow = true"
         />
         <img
            :src="musicList.al.picUrl"
            alt=""
            class="img_ar"
            :class="{
               'img_ar--active': !isStopBtnShow,
               'img_ar--pauesd': isStopBtnShow,
            }"
         />
      </div>
      <div
         class="lyric"
         v-show="isLyricShow"
         ref="musicLyric"
         @click="isLyricShow = false"
      >
         <p
            v-for="item in lyric"
            :key="item"
            :class="{active:(currentTime * 1000 >= item.time &&currentTime * 1000 < item.pre)}"
         >
            {{ item.lrc }}
         </p>
      </div>
   </div>

   <div class="detailFooter">
      <div class="footerTop">
         <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-xihuan-xianxing"></use>
         </svg>
         <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-xiazai"></use>
         </svg>
         <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-pinglun"></use>
         </svg>
         <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-gengduo1"></use>
         </svg>
      </div>
      <div class="footerContent">
         <input
            type="range"
            class="range"
            min="0"
            :max="duration"
            step="0.01"
            v-model="currentTime"
         />
      </div>
      <div class="footer">
         <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
            <use xlink:href="#icon-shangyishoushangyige"></use>
         </svg>
         <svg
            class="iconPlay"
            aria-hidden="true"
            v-if="!isStopBtnShow"
            @click="play()"
         >
            <use xlink:href="#icon-stop"></use>
         </svg>
         <svg
            class="iconPlay"
            aria-hidden="true"
            v-if="isStopBtnShow"
            @click="play()"
         >
            <use xlink:href="#icon-bofang3"></use>
         </svg>
         <svg class="icon" aria-hidden="true" @click="goPlay(1)">
            <use xlink:href="#icon-xiayigexiayishou"></use>
         </svg>
      </div>
   </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { ref, onMounted, computed } from "vue";

import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";

export default {
   data() {
      return {
         isLyricShow: false,
      };
   },
   props: ["musicList", "play", "getDuration",'goPlay'],
   components: {
      Vue3Marquee,
   },
   mounted() {
      this.getDuration();
   },

   computed: {
      ...mapState([
         "isStopBtnShow",
         "lyricList",
         "currentTime",
         "playListIndex",
         "playList",
         "duration",
      ]),
      lyric() {
         let arr;
         if (this.lyricList.lyric) {
            arr = this.lyricList.lyric
               .split(/[(\r\n)\r\n]+/)
               .map((item, index) => {
                  let min = item.slice(1, 3);
                  let sec = item.slice(4, 6);
                  let mill = item.slice(7, 10);
                  let lrc = item.slice(11, item.length);
                  if (isNaN(Number(mill))) {
                     mill = item.slice(7, 9);
                     lrc = item.slice(10, item.length);
                  }
                  let time =
                     parseInt(min) * 60 * 1000 +
                     parseInt(sec) * 1000 +
                     parseInt(mill);
                  return { min, sec, mill, lrc, time };
               });
            arr.forEach((item, index) => {
               if (index === arr.length - 1 || isNaN(arr[index + 1].time)) {
                  item.pre = 10000000;
               } else {
                  item.pre = arr[index + 1].time;
               }
            });
         } else {
            arr = [
               {
                  min: 0,
                  sec: 0,
                  mill: 0,
                  lrc: "暂无歌词",
                  time: 0,
                  pre: 100000,
               },
            ];
         }

         return arr;
      },
   },

   methods: {
      ...mapMutations([
         "updateStopBtnShow",
         "updateDetailShow",
         "updatePlayListIndex",
      ]),
   },
   watch: {
      currentTime(newValue) {
         let p = document.querySelector("p.active");
         if (p) {
            if (p.offsetTop > 350) {
               this.$refs.musicLyric.scrollTop = p.offsetTop - 350;
            }
         }
         
      },
   },
};
</script>

<style lang="less" scoped>
.bgImg {
   width: 100%;
   height: 100%;
   position: absolute;
   z-index: -1;
   filter: blur(30px);
}
.detailTop {
   width: 100%;
   height: 8%;

   display: flex;
   justify-content: space-between;
   align-items: center;

   .topLeft {
      height: 100%;
      width: 40%;

      display: flex;
      align-items: center;

      .backfore {
         width: 0.5rem;
         height: 0.5rem;
         margin: 0 0.2rem;
         fill: #fff;
      }
      .info {
         .vue3-marquee {
            width: 2rem;
         }
         .musicName {
            color: #fff;
         }
         .authorName {
            font-size: 0.27rem;
            color: rgb(143, 143, 143);
         }
         .icon {
            width: 0.2rem;
            height: 0.2rem;
            fill: rgb(143, 143, 143);
         }
      }
   }
   .topRight {
      height: 100%;
      display: flex;
      align-items: center;
      .icon {
         width: 0.5rem;
         height: 0.5rem;
         margin: 0 0.3rem;
         fill: #fff;
      }
   }
}
.detailContent {
   width: 100%;
   height: 70%;

   display: flex;
   flex-direction: column;
   align-items: center;
   .cd {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .img_needle {
         width: 2rem;
         height: 3rem;
         position: absolute;
         left: 46%;
         bottom: 63%;
         transform-origin: 0 0;
         transform: rotate(-12deg);
         transition: all 1s;
         z-index: 2;
      }
      .img_cd {
         width: 5rem;
         height: 5rem;
         position: absolute;
         bottom: 30%;
         z-index: 1;
      }
      .img_ar {
         width: 3.2rem;
         height: 3.2rem;
         border-radius: 50%;
         position: absolute;
         bottom: 38%;
         animation: rotate_ar 13s linear infinite;
      }
      .img_needle--active {
         transform: rotate(0deg);
      }
      .img_cd {
         width: 5rem;
         height: 5rem;
         position: absolute;
         bottom: 30%;
         z-index: 1;
      }
      .img_ar--active {
         animation-play-state: running;
      }
      .img_ar--pauesd {
         animation-play-state: paused;
      }
      @keyframes rotate_ar {
         0% {
            transform: rotateZ(0deg);
         }
         100% {
            transform: rotateZ(360deg);
         }
      }
   }
   .lyric {
      height: 100%;
      width: 85%;

      margin-top: 0.5rem;

      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
      p {
         margin-bottom: 1rem;
         text-align: center;
         color: rgb(199, 196, 196);
         font-size: 0.4rem;
      }
      p:first-child {
         margin-top: 5.5rem;
      }
      p:last-child {
         margin-bottom: 5.5rem;
      }
      .active {
         color: #fff;
         font-size: 0.5rem;
      }
   }
}
.detailFooter {
   width: 100%;
   height: 20%;

   display: flex;
   flex-direction: column;
   align-items: center;

   .footerTop {
      width: 80%;
      height: 40%;

      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
         width: 0.6rem;
         height: 0.6rem;
         fill: rgb(202, 202, 202);
      }
   }
   .footerContent {
      width: 100%;
      height: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      .range {
         width: 90%;
         height: 0.06rem;
      }
   }
   .footer {
      width: 50%;
      height: 40%;

      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
         width: 0.6rem;
         height: 0.6rem;
         fill: rgb(202, 202, 202);
      }
      .iconPlay {
         width: 1rem;
         height: 1rem;
         fill: rgb(202, 202, 202);
      }
   }
}
</style>