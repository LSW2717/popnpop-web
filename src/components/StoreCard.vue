<template>
  <div class="store-card" @click="goToStoreDetail(store.storeId)">
    <v-img width="200" height="200" cover :src="thumbnailUrl" style="border-radius: 12px"/>
    <div class="body3-medium text-overflow color-gray650 mt-2">{{store.address.region}}&nbsp;{{store.address.city}}</div>
    <div class="body2-medium text-overflow color-gray800 custom-stroke mt-2">{{store.name}}</div>
    <div class="body3-medium text-overflow color-gray600 my-2">{{formatDate(store.startsAt)}}&nbsp;~&nbsp;{{formatDate(store.endsAt)}}</div>
    <div class="body3-medium date-chip color-main1">{{remainingDays(store.startsAt, store.endsAt,true)}}</div>
  </div>
</template>

<script setup lang="ts">

import {formatDate, remainingDays} from "@/util/util";
import {useRouter} from "vue-router";
import {computed} from "vue"
import {SimplifiedStoreResponse} from "@/interfaces/HomeInterface";
import {AdjacentStoreResponse} from "@/interfaces/StoreDetailInterface";

const props = defineProps<{store: SimplifiedStoreResponse | AdjacentStoreResponse}>()

function hasThumbnailImageUrl(store: any): store is SimplifiedStoreResponse {
  return 'thumbnailImageUrl' in store;
}

const thumbnailUrl = computed(() => {
  if (hasThumbnailImageUrl(props.store)) {
    return props.store.thumbnailImageUrl;
  } else {
    return props.store.imageUrls[0];
  }
});

const router = useRouter();

function goToStoreDetail(id: number){
  router.push(`/store/${id}`);
}

</script>e

<style scoped>
.store-card{
  flex: 0 0 auto;
  max-width: 200px;
  max-height: 340px;
  transition: transform 0.3s ease;
  cursor: pointer;
}
.store-card:hover {
  transform: scale(1.1);
}
.date-chip {
  display: inline;
  border-radius: 6px;
  padding: 6px 8px;
  justify-content: end;
  align-items: end;
  background: #F5F5F7;
}
</style>