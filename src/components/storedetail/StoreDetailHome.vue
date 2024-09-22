<template>
  <div v-if="isLoading">
    <div class="d-flex align-center mt-10 mx-5">
      <div class="mr-2">
        <v-skeleton-loader width="50" height="30" ></v-skeleton-loader>
      </div>
      <v-skeleton-loader width="70" height="25"></v-skeleton-loader>
    </div>
    <div class="ma-5">
      <v-skeleton-loader width="500" height="25"></v-skeleton-loader>
      <v-skeleton-loader width="400" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="300" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="200" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="400" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="300" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="200" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
    </div>
    <div class="mx-5">
      <div class="mt-10 mb-4 d-flex justify-start align-center">
        <v-skeleton-loader width="100" height="25"></v-skeleton-loader>
      </div>
      <v-skeleton-loader width="500" height="25"></v-skeleton-loader>
      <v-skeleton-loader width="400" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="300" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="200" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="400" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="300" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="200" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
    </div>
    <v-divider class="my-10 mx-5"/>
    <div class="mx-5 mb-10">
      <div class="mb-4 d-flex justify-start align-center">
        <v-skeleton-loader width="90" height="25"></v-skeleton-loader>
      </div>
      <v-skeleton-loader width="500" height="25"></v-skeleton-loader>
      <v-skeleton-loader width="400" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="300" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="200" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="400" height="25" class="mt-3"></v-skeleton-loader>
    </div>
    <div class="mx-5 mb-10">
      <div class="mb-4 d-flex justify-start align-center">
        <v-skeleton-loader width="60" height="25"></v-skeleton-loader>
      </div>
      <v-skeleton-loader width="500" height="25"></v-skeleton-loader>
      <v-skeleton-loader width="400" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="300" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="500" height="25" class="mt-3"></v-skeleton-loader>
      <v-skeleton-loader width="200" height="25" class="mt-3"></v-skeleton-loader>
    </div>
  </div>
  <div v-else>
    <div class="d-flex align-center mt-10 mx-5">
      <div class="brand-chip">
        <p class="body4-medium color-gray500">Brand</p>
      </div>
      <p class="body1-medium color-gray650 custom-stroke">{{ store.brandName }}</p>
    </div>
    <div class="ma-5">
      <p class="body2-medium color-gray650" v-html="formattedText(store.storeDescription)"></p>
    </div>
    <div v-if="store.storeComments.length > 0" class="mx-5">
      <div class="mt-10 mb-4 d-flex justify-start align-center">
        <div>
          <v-img width="25" height="25" class="mr-2" src="@/assets/svg/store_detail_bell.svg"></v-img>
        </div>
        <span class="body1-medium color-gray650 custom-stroke">놓치지 마세요!</span>
      </div>
      <div v-for="item in store.storeComments" :key="item">
        <p class="body2-medium color-gray650 my-1">
          &nbsp;&nbsp;&middot;&nbsp;&nbsp;{{ item }}
        </p>
      </div>
    </div>
    <v-divider class="my-10 mx-5"/>
    <div v-if="store.activityDescription.length > 0" class="mx-5 mb-10">
      <div class="mb-4 d-flex justify-start align-center">
        <span class="body1-medium color-gray650 custom-stroke">Activity</span>
      </div>
      <div v-for="item in store.activityDescription" :key="item">
        <div class="d-flex align-center my-1">
          <div class="mr-2">
            <v-img width="20" height="20" src="@/assets/svg/store_detail_check.svg"></v-img>
          </div>
          <p class="body2-medium color-gray650 my-1">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="store.goodsDescription.length > 0" class="mx-5 mb-10">
      <div class="mb-4 d-flex justify-start align-center">
        <span class="body1-medium color-gray650 custom-stroke">Gift</span>
      </div>
      <div v-for="item in store.goodsDescription" :key="item">
        <div class="d-flex align-center my-1">
          <div class="mr-2">
            <v-img width="20" height="20" src="@/assets/svg/store_detail_check.svg"></v-img>
          </div>
          <p class="body2-medium color-gray650 my-1">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="store.editorComments.length > 0" class="pa-5 my-10" style="background-color: #F5F5F7">
      <div class=" mb-4 d-flex justify-start align-center">
        <div class="mr-2">
          <v-img width="25" height="25" src="@/assets/svg/store_detail_comments.svg"></v-img>
        </div>
        <span class="body1-medium color-gray650 custom-stroke">팝앤팝 꿀팁</span>
      </div>
      <div v-for="item in store.editorComments" :key="item">
        <div class="d-flex align-center my-1">
          <div>&nbsp;&nbsp;&middot;&nbsp;&nbsp;</div>
          <p class="body2-medium color-gray650 my-1">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 600px;"></div>
</template>

<script setup lang="ts">
import {StoreResponse} from "@/interfaces/StoreDetailInterface";
import {useStoreDetailStore} from "@/stores/StoreDetailStore";

const storeDetailStore = useStoreDetailStore();
const store = storeDetailStore.storeData as StoreResponse;

const isLoading = storeDetailStore.isLoading;

function formattedText(text: string) {
  return text.replace(/\n/g, '<br>');
}

</script>

<style scoped>
.brand-chip {
  border-radius: 8px;
  border: 1px solid #CECCD1;
  padding: 4px 6px;
  margin-right: 8px;
}

</style>