<template>
   <ItemMusicTop :playlist="state.playlist" />
   <itemMusicList
      :itemList="state.itemList"
      :subscribedCount="state.playlist.subscribedCount"
      :trackCount="state.playlist.trackCount"
   />
</template>

<script>
import { useRoute } from "vue-router";
import { reactive, onMounted } from "vue";
import { getMusicItemList, getItemList } from "@/request/api/item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import itemMusicList from "@/components/item/itemMusicList.vue";

export default {
   setup() {
      const state = reactive({
         playlist: {},
         itemList: [],
      });

      onMounted(async () => {
         // 获取id
         const id = useRoute().query.id;
         // 获取歌单详情
         const { data: res1 } = await getMusicItemList(id);

         state.playlist = res1.playlist;
         sessionStorage.setItem("itemDetail", JSON.stringify(state));
         // 获取歌单歌曲
         const { data: res2 } = await getItemList(id);
         state.itemList = res2.songs;
      });

      return {
         state,
      };
   },
   components: {
      ItemMusicTop,
      itemMusicList,
   },
};
</script>

<style>
</style>