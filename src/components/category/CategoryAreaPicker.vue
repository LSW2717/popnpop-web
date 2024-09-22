<template>
  <div class="d-flex justify-center">
    <v-card style="border-radius: 20px; min-width: 400px; height: 620px; overflow: auto">
      <v-list v-model:opened="area.open" select-strategy="classic">
        <v-list-group value="seoul">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="서울"
                class="body2-medium color-gray650"
            >
            </v-list-item>
          </template>
          <div v-for="([title1, title2],i) in area.seoul" :key="i" style="background-color: #F5F5F7">
            <div class="d-flex">
              <v-list-item
                  :key="i"
                  :value="title1"
                  style="width: 200px;"
                  @click="toggleSelection('서울', title1)"
              >
                <span class="body2-medium color-gray650">{{ title1 }}</span>
              </v-list-item>
              <v-list-item
                  :key="i"
                  :value="title2"
                  style="width: 200px;"
                  @click="toggleSelection('서울', title2)"
              >
                <span class="body2-medium color-gray650">{{ title2 }}</span>
              </v-list-item>
            </div>
          </div>
        </v-list-group>
        <v-divider class="mx-4"/>
        <v-list-group value="gyeonggi">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="경기"
                class="body2-medium color-gray650"
            >
            </v-list-item>
          </template>
          <div v-for="([title1, title2],i) in area.gyeonggi" :key="i" style="background-color: #F5F5F7">
            <div class="d-flex">
              <v-list-item
                  :key="i"
                  :value="title1"
                  style="width: 200px;"
                  @click="toggleSelection('경기', title1)"
              >
                <span class="body2-medium color-gray650">{{ title1 }}</span>
              </v-list-item>
              <v-list-item
                  :key="i"
                  :value="title2"
                  style="width: 200px;"
                  @click="toggleSelection('경기', title2)"
              >
                <span class="body2-medium color-gray650">{{ title2 }}</span>
              </v-list-item>
            </div>
          </div>
        </v-list-group>
        <v-divider class="mx-4"/>
        <v-list-group value="busan">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="부산"
                class="body2-medium color-gray650"
            >
            </v-list-item>
          </template>
          <div v-for="([title1, title2],i) in area.busan" :key="i" style="background-color: #F5F5F7">
            <div class="d-flex">
              <v-list-item
                  :key="i"
                  :value="title1"
                  style="width: 200px;"
                  @click="toggleSelection('부산', title1)"
              >
                <span class="body2-medium color-gray650">{{ title1 }}</span>
              </v-list-item>
              <v-list-item
                  :key="i"
                  :value="title2"
                  style="width: 200px;"
                  @click="toggleSelection('부산', title2)"
              >
                <span class="body2-medium color-gray650">{{ title2 }}</span>
              </v-list-item>
            </div>
          </div>
        </v-list-group>
        <v-divider class="mx-4"/>
        <v-list-group value="jeju">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="제주"
                class="body2-medium color-gray650"
            ></v-list-item>
          </template>
          <div v-for="([title1, title2],i) in area.jeju" :key="i" style="background-color: #F5F5F7">
            <div class="d-flex">
              <v-list-item
                  :key="i"
                  :value="title1"
                  style="width: 200px;"
                  @click="toggleSelection('제주', title1)"
              >
                <span class="body2-medium color-gray650">{{ title1 }}</span>
              </v-list-item>
              <v-list-item
                  :key="i"
                  :value="title2"
                  style="width: 200px;"
                  @click="toggleSelection('제주', title2)"
              >
                <span class="body2-medium color-gray650">{{ title2 }}</span>
              </v-list-item>
            </div>
          </div>
        </v-list-group>
        <v-divider class="mx-4"/>
        <div v-for="([title1, title2],i) in area.others" :key="i">
          <div class="d-flex">
            <v-list-item
                :key="i"
                :value="title1"
                style="width: 200px;"
                @click="toggleSelection(title1,null)"
            >
              <span class="body2-medium color-gray650">{{ title1 }}</span>
            </v-list-item>
            <v-list-item
                :key="i"
                :value="title2"
                style="width: 200px;"
                @click="toggleSelection(title2,null)"
            >
              <span class="body2-medium color-gray650">{{ title2 }}</span>
            </v-list-item>
          </div>
          <v-divider class="mx-4"/>
        </div>
      </v-list>
      <div class="d-flex justify-center mb-2 px-4">
        <v-btn flat
               style="width: 100%; height: 50px;background-color: #8B62FF; border-radius: 12px;"
               @click="clickArea"
        >
          <span class="body3-medium color-white">필터 적용하기</span>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, defineModel} from "vue";
import {useCategoryStore} from "@/stores/CategoryStore";

const area = reactive({
  open: ['Users'],
  seoul: [
    ["서울 전체", "강남구/서초구"],
    ["강동구/송파구", "성동구/광진구"],
    ["마포구/서대문구/은평구", "용산구/종로구/마포구"],
    ["영등포구/금천구/관악구", "동대문구/중랑구"],
    ["강서구/양천구", "강북구/성북구/노원구/도봉구"],
  ],
  gyeonggi: [
    ["경기 전체", "성남시/용인시/하남시/광주시"],
    ["인천시/부천시/김포시/광명시/시흥시", "고양시/파주시"],
    ["의정부시/양주시/포천시", "안양시/과천시/의왕시/안산시/군포시/수원시"]
  ],
  busan: [
    ["부산 전체", "해운대구/수영구/기장군"],
    ["남구/동구/부산진구", "중구/서구/영도구/사하구"],
    ["동래구/금정구/연제구"]
  ],
  jeju: [
    ["제주 전체", "제주시"],
    ["서귀포시"]
  ],
  others: [
    ["대구", "인천"],
    ["광주", "대전"],
    ["울산", "세종"],
    ["강원", "충북"],
    ["충남", "전북"],
    ["전남", "경북"],
    ["경남"]
  ]
});

const selectedRegions = ref<string[]>([]);

const toggleSelection = (region: string, city: string | null) => {

  let formattedCity = '';
  if(city !== null){
    formattedCity = city.includes('전체') ? region : `${region}.${city.replace(/\//g, '.')}`;
  }
  else{
    formattedCity = region;
  }

  if (selectedRegions.value.includes(formattedCity)) {

    selectedRegions.value = selectedRegions.value.filter(item => item !== formattedCity);
  } else {

    selectedRegions.value.push(formattedCity);
  }
};

const areaTab = defineModel('areaTab',{
  type: Boolean,
})
const pageActiveIndex = defineModel('pageActiveIndex',{
  type: Number,
});
const pageDeactiveIndex = defineModel('pageDeactiveIndex',{
  type: Number,
});
const {searchDeactiveParams, searchActiveParams, searchActive, searchDeactive} = useCategoryStore();

async function clickArea(){
  searchActiveParams.regionAndCityNames = selectedRegions.value.join(',');
  searchDeactiveParams.regionAndCityNames = selectedRegions.value.join(',');
  await searchActive();
  await searchDeactive();
  pageActiveIndex.value = 1;
  pageDeactiveIndex.value = 1;
  areaTab.value = false;
}
</script>

<style scoped>

</style>