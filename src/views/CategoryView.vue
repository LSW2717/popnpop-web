<template>
  <v-toolbar flat style="background-color: white">
    <v-toolbar-items class="d-flex justify-center align-center" style="width: 100%;"> <!-- 가운데 정렬 -->
      <v-text-field
          v-model="inputValue"
          variant="outlined"
          label="팝업스토어명, 브랜드명 검색"
          single-line
          :class="{'focused': isFocused}"
          class="body1-medium custom-input-field"
          @focus="isFocused = true"
          @blur="isFocused = false"
          color="#B89FFF"
          base-color="#97959E"
          rounded
          @keydown.enter="searchKeyword"
          style="max-width: 600px; width: 100%; background-color: white;"
      >
        <template v-slot:append-inner>
          <v-btn width="40" height="40" icon @click="searchKeyword">
            <v-icon size="30" :color="isFocused ? '#8B62FF' : '#97959E'">mdi-magnify</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-toolbar-items>
  </v-toolbar>

  <!--  메인화면-->
  <div class="d-flex justify-center">
    <v-tabs
        v-model="tab"
        align-tabs="center"
        grow
        slider-color="#8B62FF"
        style="max-width: 550px; border-bottom: 1px solid #EFEDF0"
    >
      <v-tab :value="1">
        <span class="body2-medium"
              :class="tab === 1 ? 'color-gray800' : 'color-gray600'"
        >
          운영 중
        </span>
      </v-tab>
      <v-tab :value="2">
        <span class="body2-medium"
              :class="tab === 2 ? 'color-gray800' : 'color-gray600'"
        >
          오픈 예정
        </span></v-tab>
    </v-tabs>
  </div>

  <CategoryTab
      v-model:pageActiveIndex="pageActiveIndex"
      v-model:pageDeactiveIndex="pageDeactiveIndex"
  />

  <div :class="screenWidth >= 1700 ? 'd-flex justify-space-between' : 'd-flex justify-center'">
    <CategoryAreaPicker class="ml-8"
                        v-model:pageActiveIndex="pageActiveIndex"
                        v-model:pageDeactiveIndex="pageDeactiveIndex"
                        v-if="screenWidth > 1700">
    </CategoryAreaPicker>
    <v-tabs-window v-model="tab" :transition="false">
      <v-tabs-window-item
          :value=1
          :reverse-transition="false"
          :transition="false"
      >
        <div v-if="formattedList.length > 0" class="d-flex justify-center">
          <div class="d-flex mx-5 flex-wrap justify-start align-center" style="width: 720px; margin: 0 auto;">
            <v-btn @click="reset" height="30" width="90" flat color="#EFEDF0" class="mr-2 mt-3" style="border-radius: 50px;">
              <span class="body3-medium color-gray600 mr-2">초기화</span>
              <v-icon size="20" color="#B8B6BE">mdi-refresh</v-icon>
            </v-btn>
            <div v-for="(item,i) in formattedList" :key="i">
              <div class="d-flex mr-4 mt-3">
                <span class="body3-medium color-gray800 mr-2">{{ item }}</span>
                <v-btn @click="removeItem(item)" flat color="#EFEDF0" icon size="20">
                  <v-icon size="16" color="#B8B6BE">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div v-if="categoryActiveData.content.length > 0" class="item-grid" style="max-width: 900px;">
          <div
              v-for="store in categoryActiveData.content"
              :key="store.storeId"
              class="my-4 ma-2"
          >
            <StoreCard :store="store"/>
          </div>
        </div>
        <div v-else class="d-flex flex-column justify-center align-center text-center"
             style="height: 60vh; width: 100%;">
          <span class="header4-medium color-gray800">검색 결과가 없습니다</span>
          <span class="body2-medium color-gray600 mt-4" style="width: 210px">정확한 검색어를 재입력하거나 필터를 다시 설정해주세요</span>
        </div>
      </v-tabs-window-item>
      <v-tabs-window-item
          :value=2
          :reverse-transition="false"
          :transition="false"
      >
        <div v-if="formattedList.length > 0" class="d-flex justify-center">
          <div class="d-flex mx-5 flex-wrap justify-start align-center" style="width: 720px; margin: 0 auto;">
            <v-btn @click="reset" height="30" width="90" flat color="#EFEDF0" class="mr-2 mt-3" style="border-radius: 50px;">
              <span class="body3-medium color-gray600 mr-2">초기화</span>
              <v-icon size="20" color="#B8B6BE">mdi-refresh</v-icon>
            </v-btn>
            <div v-for="(item,i) in formattedList" :key="i">
              <div class="d-flex mr-4 mt-3">
                <span class="body3-medium color-gray800 mr-2">{{ item }}</span>
                <v-btn @click="removeItem(item)" flat color="#EFEDF0" icon size="20">
                  <v-icon size="16" color="#B8B6BE">mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
        <div v-if="categoryDeactiveData.content.length > 0" class="item-grid" style="max-width: 900px;">
          <div
              v-for="store in categoryDeactiveData.content"
              :key="store.storeId"
              class="my-4 ma-2"
          >
            <StoreCard :store="store"/>
          </div>
        </div>
        <div v-else class="d-flex flex-column justify-center align-center text-center"
             style="height: 60vh; width: 100%;">
          <span class="header4-medium color-gray800">검색 결과가 없습니다</span>
          <span class="body2-medium color-gray600 mt-4" style="width: 210px">정확한 검색어를 재입력하거나 필터를 다시 설정해주세요</span>
        </div>
      </v-tabs-window-item>
    </v-tabs-window>

    <CategoryDatePicker class="mr-8"
                        v-model:pageActiveIndex="pageActiveIndex"
                        v-model:pageDeactiveIndex="pageDeactiveIndex"
                        v-model:date="date"
                        v-if="screenWidth > 1700">
    </CategoryDatePicker>
  </div>


  <!--  페이지네이션-->
  <v-footer app style="position: fixed; bottom: 0; left: 0; width: 100%">
    <div class="d-flex justify-center" style="width: 100%">
      <v-pagination
          v-if="tab === 1"
          :length="categoryActiveData.totalPages"
          v-model="pageActiveIndex"
          @click="onPageChange"
          :total-visible="7"
      ></v-pagination>
      <v-pagination
          v-if="tab === 2"
          :length="categoryDeactiveData.totalPages"
          v-model="pageDeactiveIndex"
          @click="onPageChange"
          :total-visible="7"
      ></v-pagination>
    </div>
  </v-footer>
</template>

<script setup lang="ts">

import {onBeforeUnmount, onMounted, ref} from "vue";
import {useCategoryStore} from "@/stores/CategoryStore";
import StoreCard from "@/components/StoreCard.vue";
import CategoryDatePicker from "@/components/category/CategoryDatePicker.vue";
import CategoryAreaPicker from "@/components/category/CategoryAreaPicker.vue";
import CategoryTab from "@/components/category/CategoryTab.vue";

const tab = ref<number>(1);
const isFocused = ref<boolean>(false);
const inputValue = ref<string | null>('');
const pageActiveIndex = ref<number>(1);
const pageDeactiveIndex = ref<number>(1);
const screenWidth = ref(window.innerWidth);
const date = ref({
  start: new Date(),
  end: new Date(),
});

const {
  searchActiveParams,
  searchDeactiveParams,
  categoryActiveData,
  categoryDeactiveData,
  searchActive,
  searchDeactive,
  formattedList,
  resetSearchParams
} = useCategoryStore();

function dateReset() {
  date.value = {
    start: new Date(),
    end: new Date(),
  };
  searchActiveParams.startRangeDate = null;
  searchActiveParams.endRangeDate = null;
  searchDeactiveParams.startRangeDate = null;
  searchDeactiveParams.endRangeDate = null;
}

// 지역 삭제 메서드
function removeRegion(region: string) {
  if (searchActiveParams.regionAndCityNames) {
    let regions = searchActiveParams.regionAndCityNames.split(',');
    regions = regions.filter((item) => item !== region);
    searchActiveParams.regionAndCityNames = regions.length ? regions.join(',') : null;
  }

  if (searchDeactiveParams.regionAndCityNames) {
    let regions = searchDeactiveParams.regionAndCityNames.split(',');
    regions = regions.filter((item) => item !== region);
    searchDeactiveParams.regionAndCityNames = regions.length ? regions.join(',') : null;
  }
}

// 필터 제거 메서드
async function removeItem(item: string) {
  if (item.includes('~')) {
    dateReset();
  } else {
    removeRegion(item);
  }
  const index = formattedList.indexOf(item);
  if (index !== -1) {
    formattedList.splice(index, 1);
  }
  await searchActive();
  await searchDeactive();
}
function reset(){
  resetSearchParams()
  .then(() => {
    dateReset();
  });
}

async function searchKeyword() {
  searchActiveParams.keyword = inputValue.value;
  searchDeactiveParams.keyword = inputValue.value;
  await searchActive();
  await searchDeactive();
}

const onPageChange = async () => {
  window.scrollTo({top: 0, behavior: 'instant'});
  searchActiveParams.page = pageActiveIndex.value - 1;
  searchDeactiveParams.page = pageDeactiveIndex.value - 1;
  await searchActive();
  await searchDeactive();
};


const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  searchActive();
  searchDeactive();
  reset();
  window.addEventListener('resize', updateScreenWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScreenWidth);
});


</script>

<style scoped>
.custom-input-field {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 800px;
}

.item-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
}
</style>