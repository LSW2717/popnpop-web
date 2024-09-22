<template>
  <div>
    <StoreDetailImages/>
    <div class="d-flex justify-center store-detail-container">
      <div v-if="screenWidth <= 1700" class="detail-container">
        <StoreDetailBody/>
        <StoreDetailHome/>
      </div>
      <div v-if="screenWidth > 1700" class="detail-container">
        <StoreDetailReviews/>
      </div>
      <div class="store-detail-sub-container">
        <div v-if="screenWidth > 1700" class="detail-container">
          <StoreDetailBody/>
          <StoreDetailHome/>
        </div>
        <div class="detail-container">
          <StoreDetailMap/>
          <StoreDetailAdjacent/>
          <StoreDetailSimilar/>
        </div>
        <div v-if="screenWidth <= 1700" class="detail-container">
          <StoreDetailReviews/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import StoreDetailImages from "@/components/storedetail/StoreDetailImages.vue";
import StoreDetailBody from "@/components/storedetail/StoreDetailBody.vue";
import StoreDetailHome from "@/components/storedetail/StoreDetailHome.vue";
import StoreDetailAdjacent from "@/components/storedetail/StoreDetailAdjacent.vue";
import StoreDetailSimilar from "@/components/storedetail/StoreDetailSimilar.vue";
import StoreDetailReviews from "@/components/storedetail/StoreDetailReviews.vue";
import {onBeforeUnmount, onMounted, ref} from "vue";
import StoreDetailMap from "@/components/storedetail/StoreDetailMap.vue";

const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

</script>

<style scoped>
.detail-container {
  max-width: 600px;
  min-width: 300px;
}


@media (max-width: 1200px) and (min-width: 601px) {
  .store-detail-container {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 600px) {
  .store-detail-container {
    flex-direction: column;
  }
}

@media (min-width: 1700px) {
  .store-detail-sub-container {
    display: flex;
    flex-direction: row;
  }
}

</style>