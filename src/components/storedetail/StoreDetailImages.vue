<template>
  <div v-if="isLoading">
    <carousel :items-to-show="3"
              :wrap-around="true"
              :autoplay="3000"
              :breakpoints="{
              1600: { itemsToShow: 4 },
              1200: { itemsToShow: 3 },
              800: { itemsToShow: 2 },
              0: { itemsToShow: 1 }
            }"
    >
      <slide v-for="item in 5"
             :key="item"
             style="height: 400px"
      >

        <v-skeleton-loader width="400" height="400" :src="item"></v-skeleton-loader>

      </slide>
    </carousel>
  </div>
  <div v-else>
    <v-toolbar v-if="collapse && scrollPosition > 10" height="70"
               style="position: fixed; top: 60px; background-color: white; z-index: 100">
      <v-toolbar-title class="header3-medium ml-14 mt-2">{{ store.name }}</v-toolbar-title>
    </v-toolbar>
    <v-dialog v-model="isDialogOpen" max-width="500">
      <v-card>
        <v-img :src="img" style="max-width: 100%;"/>
      </v-card>
    </v-dialog>
    <v-btn v-if="collapse && scrollPosition > 10"
           @click="router.back()" icon flat
           class="back-button ma-2"
           style="background-color: transparent"
    >
      <v-icon color="black">
        mdi-chevron-left
      </v-icon>
    </v-btn>
    <v-btn v-else @click="router.back()" icon flat
           class="back-button ma-2"
           color="transparent"
    >
      <v-icon color="white">
        mdi-chevron-left
      </v-icon>
    </v-btn>
    <carousel :items-to-show="1"
              :wrap-around="true"
              class="toolbar-shadow"
              :breakpoints="{
              1600: { itemsToShow: 4 },
              1200: { itemsToShow: 3 },
              800: { itemsToShow: 2 },
              0: { itemsToShow: 1 }
            }"
    >
      <slide v-for="item in store.imageUrls"
             :key="item"
             style="height: 400px"
      >

        <v-img height="400" :src="item" @dblclick="toggleDialog(item)" cover style="cursor: pointer;"></v-img>

      </slide>
      <template #addons>
        <navigation/>
      </template>
    </carousel>
    <div ref="scrollTitle"></div>
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Navigation, Slide} from "vue3-carousel";
import {useRouter} from "vue-router";
import {onBeforeUnmount, onMounted, ref, watchEffect} from "vue";
import {StoreResponse} from "@/interfaces/StoreDetailInterface";
import {useStoreDetailStore} from "@/stores/StoreDetailStore";

const storeDetailStore = useStoreDetailStore();
const store = storeDetailStore.storeData as StoreResponse;
const router = useRouter();
const scrollPosition = ref<number>(0);

const scrollTitle = ref<HTMLDivElement | null>(null);
const collapse = ref(false);
const img = ref<string>('');

const isLoading = storeDetailStore.isLoading;
const isDialogOpen = ref(false);

const toggleDialog = (imgUrl: string) => {
  img.value = imgUrl;
  isDialogOpen.value = !isDialogOpen.value;
}

const handleScroll = () => {
  scrollPosition.value = window.scrollY || document.documentElement.scrollTop;
  if (scrollTitle.value) {
    const rect = scrollTitle.value.getBoundingClientRect();
    collapse.value = rect.top <= 100;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

watchEffect(() => {
  if (scrollTitle.value) {
    const rect = scrollTitle.value.getBoundingClientRect();
    if (window.scrollY >= rect.top + window.scrollY) {
      collapse.value = false;
    }
  }
});
</script>

<style scoped>
.toolbar-shadow {
  position: relative;
}

.toolbar-shadow::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 33.33%; /* 상단에서 3분의 1까지 적용 */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  z-index: 1100; /* 그림자를 v-toolbar 아래에 놓음 */
}

.back-button {
  position: fixed;
  left: 0;
  top: 67px;
  z-index: 1200;
}
</style>