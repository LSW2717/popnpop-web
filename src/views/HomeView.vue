<template>
  <HomeBanners/>

  <HomeCurations :curations="homeStore.homeData.curations.slice(0,2)"/>

<!--  <HomePlaces/>-->

  <HomeReviews/>

  <HomeCurations :curations="homeStore.homeData.curations.slice(2,3)"/>
  <HomeCurations :curations="homeStore.homeData.curations.slice(3,6)"/>

</template>

<script setup lang="ts">
import HomeCurations from "@/components/home/HomeCurations.vue";
import HomeBanners from "@/components/home/HomeBanners.vue";
import {useHomeStore} from "@/stores/HomeStore";
import HomeReviews from "@/components/home/HomeReviews.vue";
// import HomePlaces from "@/components/home/HomePlaces.vue";

const homeStore = useHomeStore();



</script>

<style scoped>

</style>