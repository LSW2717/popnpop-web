<template>
  <div class="d-flex justify-center">
    <v-card class="d-flex flex-column  align-center"
            style="border-radius: 20px; min-width: 400px; height: 610px;">
      <DatePicker
          flat
          :range="true"
          v-model.range="date"
          color="purple"
          :rows="2"
          style="height: 620px; width: 410px; padding-bottom: 100px; border: 1px solid white"
      >
      </DatePicker>
      <v-btn flat
             style="width: 360px; height: 50px; position: absolute; bottom: 20px; z-index: 2000; background-color: #8B62FF; border-radius: 12px;"
             @click="clickDate"
      >
        <span class="body3-medium color-white">필터 적용하기</span>
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">

import {DatePicker} from "v-calendar";
import {defineModel} from "vue";
import {formatSearchDate} from "@/util/util";
import {useCategoryStore} from "@/stores/CategoryStore";

const dateTab = defineModel('dateTab',{
  type: Boolean,
});
const pageActiveIndex = defineModel('pageActiveIndex',{
  type: Number,
});
const pageDeactiveIndex = defineModel('pageDeactiveIndex',{
  type: Number,
});
const date = defineModel('date', {
  type: Object,
  default: () => ({
    start: new Date(),
    end: new Date(),
  })
});
const {searchDeactiveParams, searchActiveParams, searchActive, searchDeactive} = useCategoryStore();

async function clickDate() {
  searchActiveParams.startRangeDate = formatSearchDate(date.value.start);
  searchActiveParams.endRangeDate = formatSearchDate(date.value.end);
  searchDeactiveParams.startRangeDate = formatSearchDate(date.value.start);
  searchDeactiveParams.endRangeDate = formatSearchDate(date.value.end);
  await searchActive();
  await searchDeactive();
  dateTab.value = false;
  pageActiveIndex.value=1;
  pageDeactiveIndex.value=1;
}

</script>

<style scoped>

</style>