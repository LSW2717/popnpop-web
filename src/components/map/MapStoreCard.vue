<template>
  <div style="width: 300px;">
    <v-img class="mb-2" width="300" height="200" cover :src="item.imageUrls[0]" style="border-radius: 12px;"></v-img>
    <span class="text-overflow brand-chip body4-medium color-gray600">{{item.brandName}}</span>
    <span class="text-overflow header5-medium color-gray800 mt-2">{{item.name}}</span>
    <span class="text-overflow body2-medium color-gray650 mt-2">{{item.description}}</span>
    <span class="text-overflow body3-medium color-gray600 mt-2">{{formatDateRange(item.startsAt, item.endsAt)}}</span>
    <span class="text-overflow body3-medium color-gray900 my-2">{{item.distance}}</span>
    <div class="body3-medium date-chip color-main1 mt-2">{{remainingDays(item.startsAt, item.endsAt, false)}}</div>
  </div>
</template>

<script setup lang="ts">

import {formatDateRange, remainingDays} from "@/util/util.ts";
import {defineModel} from "vue";
const item = defineModel('item',{
  type: Object,
});
</script>

<style scoped>
.date-chip {
  display: inline;
  border-radius: 6px;
  padding: 6px 8px;
  justify-content: end;
  align-items: end;
  background: #F5F5F7;
}
.brand-chip{
  display: inline;
  padding: 6px 6px;
  border-radius: 4px;
  border: 1px solid #EEE;
  background: #FFF;
}
</style>