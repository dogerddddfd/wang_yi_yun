<template>
   <router-view />
   <FooterMusic />
</template>

<script>
import FooterMusic from "@/components/footer/FooterMusic.vue";
export default {
   componetns: {
      FooterMusic,
   },
};
</script>

<style lang="less">
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}
.icon {
   width: 0.4rem;
   height: 0.4rem;
}
a {
   color: black;
}
</style>
