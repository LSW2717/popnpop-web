<template>
  <div class="d-flex justify-center">
    <div class="d-flex mx-5 mt-4 justify-space-around" style="width: 1300px; margin: 0 auto;">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
              color="white"
              v-bind="props"
              flat
              style="border-radius: 50px; border: 1px solid #EFEDF0"
          >
            <span v-if="currentMenu == '' || currentMenu == '전체'" class="body3-medium color-gray650">전체</span>
            <span v-else class="body3-medium color-main1">{{ currentMenu }}</span>
            <v-icon class="color-gray400">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list style="border-radius: 12px; margin: 0">
          <v-list-item
              v-for="(item, index) in menus"
              :key="index"
              :value="index"
              @click="clickMenu(item.title, index)"
              class="pa-0"
              :style="index === menus.length - 1? {} : {borderBottom: '1px solid #EFEDF0'}"
          >
            <span class="body3-medium color-gray650 py-2 px-3">{{ item.title }}</span>
          </v-list-item>
        </v-list>
      </v-menu>

      <div>
        <v-btn
            flat
            @click="areaTab=true"
            v-if="screenWidth <= 1700"
            style="width: 70px;"
        >
          <v-img class="mr-1" width="20" height="20" src="@/assets/svg/category_location.svg"></v-img>
          <span class="body3-medium color-gray650">지역</span>
        </v-btn>
        <v-dialog v-model="areaTab" :scrim="false">
          <CategoryAreaPicker
              v-model:areaTab="areaTab"
              v-model:pageActiveIndex="pageActiveIndex"
              v-model:pageDeactiveIndex="pageDeactiveIndex"
          />
        </v-dialog>

        <v-btn
            flat
            @click="dateTab=true"
            v-if="screenWidth <= 1700"
        >
          <v-img class="mr-1" width="20" height="20" src="@/assets/svg/category_calender.svg"></v-img>
          <span class="body3-medium color-gray650">기간</span>
        </v-btn>
        <v-dialog v-model="dateTab" :scrim="false">
          <CategoryDatePicker
              v-model:dateTab="dateTab"
              v-model:pageActiveIndex="pageActiveIndex"
              v-model:pageDeactiveIndex="pageDeactiveIndex"
          />
        </v-dialog>

        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                flat
                style="width: 70px;"
            >
              <v-icon color="#B8B6BE">mdi-chevron-down</v-icon>
              <span class="body3-medium color-gray650">{{ currentSort == '' ? '오픈일순' : currentSort }}</span>
            </v-btn>
          </template>
          <v-list style="border-radius: 12px; margin: 0">
            <v-list-item
                v-for="(item, index) in sorts"
                :key="index"
                :value="index"
                @click="clickSort(item.title)"
                class="pa-0"
                :style="index === sorts.length - 1? {} : {borderBottom: '1px solid #EFEDF0'}"
            >
              <span class="body3-medium color-gray650 py-2 px-3">{{ item.title }}</span>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {reactive, ref,onBeforeUnmount, onMounted, defineModel} from "vue";
import {getApiValueFromKorean} from "@/interfaces/CategoryInterface";
import {useCategoryStore} from "@/stores/CategoryStore";
import CategoryAreaPicker from "@/components/category/CategoryAreaPicker.vue";
import CategoryDatePicker from "@/components/category/CategoryDatePicker.vue";

const menus = reactive([
  {title: '전체'},
  {title: '패션'},
  {title: '뷰티'},
  {title: '푸드'},
  {title: '라이프스타일'},
  {title: '아트'},
  {title: '기타'},
]);
const sorts = reactive([
  {title: '오픈일순'},
  {title: '종료일순'},
  {title: '조회순'},
  {title: '저장순'},
]);
const dateTab = ref<boolean>(false);
const areaTab = ref<boolean>(false);

const {searchActiveParams, searchDeactiveParams, searchActive, searchDeactive} = useCategoryStore();
const currentMenu = ref<string>('');
const currentSort = ref<string>('');
const currentMenuIndex = ref<number>(0);
const screenWidth = ref(window.innerWidth);
const pageActiveIndex = defineModel('pageActiveIndex',{
  type: Number,
});
const pageDeactiveIndex = defineModel('pageDeactiveIndex',{
  type: Number,
});

async function clickMenu(title: string, index: number) {
  currentMenu.value = title;
  currentMenuIndex.value = index;
  if (index == 0) {
    searchActiveParams.categoryId = null;
    searchDeactiveParams.categoryId = null;
  } else {
    searchActiveParams.categoryId = index;
    searchDeactiveParams.categoryId = index;
  }
  await searchActive();
  await searchDeactive();
  pageActiveIndex.value=1;
  pageDeactiveIndex.value=1;
}

async function clickSort(title: string) {
  currentSort.value = title;
  searchActiveParams.sortType = getApiValueFromKorean(title);
  searchDeactiveParams.sortType = getApiValueFromKorean(title);
  await searchActive();
  await searchDeactive();
  pageActiveIndex.value=1;
  pageDeactiveIndex.value=1;
}

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

</style>