<template>
   <div class="FooterMusic">
      <div class="footerLeft" @click="updateDetailShow()">
         <img :src="playList[playListIndex].al.picUrl" alt="" />
         <div>
            <p>{{ playList[playListIndex].name }}</p>
            <span>横划切换上下首</span>
         </div>
      </div>
      <div class="footerRight">
         <svg
            class="icon"
            aria-hidden="true"
            v-if="isStopBtnShow"
            @click="play()"
         >
            <use xlink:href="#icon-bofang2"></use>
         </svg>
         <svg
            class="icon"
            aria-hidden="true"
            v-if="!isStopBtnShow"
            @click="play()"
         >
            <use xlink:href="#icon-stop"></use>
         </svg>
         <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-liebiao"></use>
         </svg>
      </div>
      <audio
         ref="audio"
         :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
         @canplay="getDuration()"
      ></audio>
      <van-popup
         v-model:show="detailShow"
         position="right"
         :style="{ height: '100%', width: '100%' }"
      >
         <MusicDetali
            :musicList="playList[playListIndex]"
            :play="play"
            :goPlay="goPlay"
            :getDuration="getDuration"
         />
      </van-popup>
   </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { ref, onMounted, computed } from "vue";
import MusicDetali from "@/components/footer/MusicDetail.vue";
export default {
   data() {
      return {
         interVal: 0,
      };
   },
   mounted() {
      this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);

   },

   computed: {
      ...mapState([
         "playList",
         "playListIndex",
         "isStopBtnShow",
         "detailShow",
         "currentTime",
         "duration",
      ]),
   },
   updated() {
      this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
   },

   methods: {
      play() {
         this.getDuration();

         if (this.$refs.audio.paused) {
            this.$refs.audio.play();
            this.updateTime()
            this.updateStopBtnShow(false);
         } else {
            this.$refs.audio.pause();
            this.updateStopBtnShow(true);
            clearInterval(this.interVal);
         }
      },
      goPlay(num) {

         let index = this.playListIndex + num;
         if (index < 0) {
            index = this.playList.length - 1;
         } else if (index === this.playList.length) {
            index = 0;
         }
         this.updatePlayListIndex(index);
         this.getDuration();

      },
      updateTime() {
         this.interVal = setInterval(() => {
            this.updateCurrentTime(this.$refs.audio.currentTime);
         }, 10);
      },
      getDuration(){
         this.updateDuration(this.$refs.audio.duration);

      },
      ...mapMutations([
         "updateStopBtnShow",
         "updateDetailShow",
         "updateCurrentTime",
         "updateDuration",
         "updatePlayListIndex",
      ]),
   },
   watch: {
      // 下标改变
      playListIndex() {
         
         clearInterval(this.interVal);
         this.$refs.audio.autoplay = true;
         this.updateTime();      

         if (this.$refs.audio.paused) {
            this.updateStopBtnShow(false);
         }
      },
      // 歌单改变
      playList() {
         clearInterval(this.interVal);
         this.$refs.audio.autoplay = true;
         this.updateTime();


         if (this.$refs.audio.paused) {
            this.updateStopBtnShow(false);
         }
      },
      currentTime(newValue) {
         if (newValue >= this.duration) {
            this.goPlay(1);
         }
      },
   },
   components: { MusicDetali },
};
</script>




<style lang="less" scoped>
.FooterMusic {
   width: 100%;
   height: 1.1rem;
   background-color: #fff;
   position: fixed;
   border-top: solid 0.02rem #ddd;
   bottom: 0;
   display: flex;
   justify-content: space-between;
   .footerLeft {
      width: 70%;
      height: 100%;
      display: flex;
      align-items: center;
      img {
         margin: 0 0.14rem;
         width: 0.8rem;
         height: 0.8rem;
         border-radius: 50%;
      }
      div {
         p {
            font-size: 0.32rem;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            word-break: break-all;
            -webkit-box-orient: vertical;
         }
         span {
            font-size: 0.15rem;
            color: rgba(148, 148, 148, 0.801);
         }
      }
   }
   .footerRight {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
         width: 0.5rem;
         height: 0.5rem;
         margin: 0 0.1rem;
      }
   }
}
</style>