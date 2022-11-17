<template>
   <div id="swiperTop">
      <van-swipe :autoplay="8000" lazy-render>
         <van-swipe-item v-for="image in state.images" :key="image">
            <img :src="image.pic" />
         </van-swipe-item>
      </van-swipe>
   </div>
</template>

<script>
import {getBanner} from '@/request/api/home.js'
import{reactive,onMounted,} from 'vue'

export default {
   setup() {
      const state = reactive({
         images:['','']
      });

      onMounted(async ()=>{
         // axios.get('http://localhost:3000/banner?type=2').then((res)=>{
         //    state.images=res.data.banners
         // })
            const {data:res} =await getBanner();
            state.images=res.banners
      })



      return { state }
   },
};
</script>







<style lang="less" scoped>
#swiperTop {
   .van-swipe {
      width: 100%;
      height: 3rem;
      .van-swipe-item {
         padding: 0 0.2rem;
         img {
            width: 100%;
            height: 3rem;
            border-radius: 0.2rem;
         }
      }
   }
}
</style>

<style lang="less">
#swiperTop {
   .van-swipe {
      .van-swipe__indicator--active {
         background-color: rgb(219, 130, 130);
      }
   }
}
</style>

