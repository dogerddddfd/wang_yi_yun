<template>
   <div class="itemMusicTop">
      <img :src="playlist.coverImgUrl" class="bgimg" alt="" />
      <div class="itemLeft">
         <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
         </svg>
         <span>歌单</span>
      </div>
      <div class="itemRight">
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-search"></use>
         </svg>
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao2"></use>
         </svg>
      </div>
   </div>
   <div class="itemMusicContent">
      <div class="itemImg">
         <div class="playCount">
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-bofang1"></use>
            </svg>
            <span>{{ changeCount(playlist.playCount) }}</span>
         </div>
         <img :src="playlist.coverImgUrl" alt="playlist.name" />
      </div>
      <div class="info">
         <span class="title">{{ playlist.name }}</span>
         <div class="creatorInfo">
            <img :src="playlist.creator.avatarUrl" class="creatorImg" alt="" />
            <span>{{ playlist.creator.nickname }}</span>
            <svg class="icon" aria-hidden="true">
               <use xlink:href="#icon-xiayiye"></use>
            </svg>
         </div>
         <div class="description">
            <span class="description">{{ playlist.description }}</span>
         </div>
      </div>
   </div>
   <div class="iconList">
      <div>
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinglun"></use>
         </svg>
         <span>{{ playlist.commentCount }}</span>
      </div>
      <div>
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
         </svg>
         <span>{{ playlist.shareCount }}</span>
      </div>
      <div>
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
         </svg>
         <span>下载</span>
      </div>
      <div>
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-show_duoxuan"></use>
         </svg>
         <span>多选</span>
      </div>
   </div>
</template>

<script>
export default {
   setup(props) {
      // props
      if ((props.playlist.creator = "")) {
         props.playlist.creator = JSON.parse(
            sessionStorage.getItem().playlist
         ).creator;
      }

      // methods
      function changeCount(num) {
         if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + "亿";
         } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + "万";
         }
      }

      return {
         changeCount,
      };
      // 保存本地 防止刷新丢失
   },
   props: ["playlist"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
   width: 100%;
   height: 1rem;
   display: flex;
   justify-content: space-between;
   align-items: center;
   position: relative;
   .itemLeft,
   .itemRight {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0.2rem;
      span {
         font-size: 0.4rem;
         color: #fff;
      }
      .icon {
         width: 30px;
         height: 30px;
         fill: #fff;
      }
   }
   .bgimg {
      width: 100%;
      height: 11rem;
      position: fixed;
      z-index: -1;
      filter: blur(0.4rem);
   }
}
.itemMusicContent {
   width: 100%;
   height: 3rem;
   display: flex;
   margin: 0.35rem 0.2rem 0.2rem 0;
   .itemImg {
      position: relative;
      .playCount {
         position: absolute;
         right: .2rem;
         margin: 0.1rem 0.2rem;
         display: flex;
         color: rgba(190, 189, 189, 0.76);
         font-size: 0.28rem;
         line-height: 0.28rem;
         .icon {
            width: 0.3rem;
            height: 0.3rem;
            fill: rgba(190, 189, 189, 0.76);
         }
      }
      img {
         width: 3rem;
         height: 3rem;
         margin: 0 .2rem;
         border-radius: 0.3rem;
      }
   }
   .info {
      color: rgb(160, 157, 157);
      width: 60%;
      .title {
         font-size: 0.35rem;
         font-weight: 800;
         color: #eee;
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 2;
         word-break: break-all;
         -webkit-box-orient: vertical;
      }
      .creatorInfo {
         width: 100%;
         height: 0.7rem;
         margin: 0.35rem 0;
         display: flex;
         align-items: center;
         span {
            line-height: 0.7rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            word-break: break-all;
            -webkit-box-orient: vertical;
         }
         .creatorImg {
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
            margin-right: 0.2rem;
         }
         .icon{
            width: .25rem;
            margin-left: .1rem;
            fill: rgb(160, 157, 157);
         }
      }
      .description {
         width: 100%;
         display: flex;
         align-items: center;
         span {
            width: 80%;
            height: 0.8rem;
            display: block;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            word-break: break-all;
            -webkit-box-orient: vertical;
         }
         .icon {
            width: .2rem;
            fill: rgb(160, 157, 157);
         }
      }
   }
}
.iconList {
   width: 100%;
   height: 1.5rem;
   margin-top: 0.4rem;
   display: flex;
   justify-content: space-between;
   div {
      width: 25%;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;

      .icon {
         width: 0.6rem;
         height: 0.6rem;
         fill: rgb(196, 193, 193);
      }
      span {
         display: block;
         position: absolute;
         top: 60%;
         left: 50%;
         transform: translate(-50%, -50%);
         color: rgb(196, 193, 193);
         font-weight: 500;
      }
   }
}
</style>