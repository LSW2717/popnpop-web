<template>
  <div v-if="isLoading" class="mx-5 mt-5">
    <div class="d-flex justify-space-between align-center">
      <v-skeleton-loader height="30" width="120"></v-skeleton-loader>
      <v-skeleton-loader height="30" width="100"></v-skeleton-loader>
    </div>
    <v-skeleton-loader width="200" height="30" class="mt-1 mb-2"></v-skeleton-loader>
    <div class="d-flex">
      <div v-for="item in 2" :key="item" class="mr-2">
        <v-skeleton-loader width="100" height="30"></v-skeleton-loader>
      </div>
    </div>
    <v-divider class="my-6"/>
    <div>
      <div class="d-flex">
        <v-skeleton-loader width="60" height="25" style="margin-right: 100px"></v-skeleton-loader>
        <v-skeleton-loader width="220" height="25s"></v-skeleton-loader>
      </div>
      <div class="d-flex mt-5">
        <v-skeleton-loader width="60" height="25" style="margin-right: 100px"></v-skeleton-loader>
        <v-skeleton-loader width="200" height="25s"></v-skeleton-loader>
      </div>
      <div class="d-flex mt-5">
        <v-skeleton-loader width="60" height="25" style="margin-right: 100px"></v-skeleton-loader>
        <div>
          <v-skeleton-loader width="120" height="25" style="margin-right: 100px"></v-skeleton-loader>
          <v-skeleton-loader width="250" height="20" class="mt-3"></v-skeleton-loader>
        </div>
      </div>
      <div v-if="store.instagramIds.length > 0" class="d-flex align-start mt-5">
        <v-skeleton-loader width="75" height="25" style="margin-right: 85px"></v-skeleton-loader>
        <div>
          <v-skeleton-loader width="170" height="25" class="mb-2" style="margin-right: 85px"></v-skeleton-loader>
        </div>
      </div>
      <div v-if="store.websiteUrls.length > 0" class="d-flex mt-2">
        <v-skeleton-loader width="75" height="25" style="margin-right: 85px"></v-skeleton-loader>
        <div>
          <v-skeleton-loader width="100" height="25" style="margin-right: 85px"></v-skeleton-loader>
        </div>
      </div>
    </div>
    <v-divider class="my-6"/>
  </div>
  <div v-else class="mx-5 mt-5">
    <div class="d-flex justify-space-between align-center">
      <p class="body3-medium color-gray600">{{ store.address.region }}&nbsp;{{ store.address.city }}</p>
      <p class="body4-medium color-main1 date-chip">{{ remainingDays(store.startsAt, store.endsAt) }}</p>
    </div>
    <p class="header4-medium color-gray800 mt-1 mb-2 custom-stroke">{{ store.name }}</p>
    <div class="d-flex">
      <div v-for="(item, index) in store.categories" :key="index" class="category-chip">
        <p class="body4-medium color-gray600">{{ item.name }}</p>
      </div>
    </div>
    <v-divider class="my-6"/>
    <div>
      <div class="d-flex">
        <p class="body2-medium color-gray500 nowrap" style="margin-right: 100px">운영날짜</p>
        <p class="body2-medium color-gray700">{{ formatDateRange(store.startsAt, store.endsAt) }}</p>
      </div>
      <div
          class="d-flex mt-5"
          @click="isExpanded = !isExpanded"
          style="cursor: pointer"
      >
        <p class="body2-medium color-gray500 nowrap" style="margin-right: 100px">운영시간</p>
        <p class="body2-medium color-gray700">{{ formatOpeningHours(store.openingHours) }}</p>
        <div class="ml-1">
          <v-icon v-if="isExpanded">mdi-chevron-up</v-icon>
          <v-icon v-else>mdi-chevron-down</v-icon>
        </div>
      </div>
      <v-expand-transition>
        <div v-if="isExpanded">
          <div v-for="(item,index) in store.openingHours" :key="index" style="margin-left: 160px;">
            <span class="body3-medium color-gray600">{{formatOpeningHour(item.dayOfWeek, item.startsAt, item.endsAt)}}</span>
          </div>
          <div style="margin-left: 160px" class="body3-medium color-gray600 mt-2">
            {{store.openingHourDescription}}
          </div>
        </div>
      </v-expand-transition>
      <div class="d-flex mt-5">
        <p class="body2-medium color-gray500 nowrap" style="margin-right: 100px">방문방법</p>
        <div>
          <p class="body2-medium color-gray700">
            {{ formatReservationTypes(store.reservationDescription.reservationTypes) }}</p>
          <p v-if="store.reservationDescription.reservationStartsAt != null && store.reservationDescription.reservationEndsAt" class="body4-medium color-gray800 mt-3">
            (예약기간:
            {{
              formatDateRange(store.reservationDescription.reservationStartsAt, store.reservationDescription.reservationEndsAt)
            }})
          </p>
        </div>
      </div>
      <div v-if="store.instagramIds.length > 0" class="d-flex align-start mt-5">
        <p class="body2-medium color-gray500 nowrap" style="margin-right:85px;">인스타그램</p>
        <div>
          <div v-for="item in store.instagramIds" @click="navigateToInstar(item)" class="category-chip mb-2" :key="item" style="cursor:pointer;">
            <div class="d-flex">
              <span class="body4-medium color-gray650 mr-1 text-overflow">@{{ item }}</span>
              <v-img width="18" src="@/assets/svg/store_detail_instagram_badge.svg"></v-img>
            </div>
          </div>
        </div>
      </div>
      <div v-if="store.websiteUrls.length > 0" class="d-flex mt-2">
        <p class="body2-medium color-gray500 nowrap" style="margin-right:85px;">공식페이지</p>
        <div>
          <div v-for="item in store.websiteUrls" @click="navigateTo(item)" class="category-chip mb-2" :key="item" style="cursor:pointer;">
            <span class="body4-medium color-gray650 text-overflow">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
    <v-divider class="my-6"/>
  </div>
</template>

<script setup lang="ts">
import {
  formatDateRange,
  formatOpeningHour,
  formatOpeningHours,
  formatReservationTypes,
  remainingDays
} from "@/util/util";
import {StoreResponse} from "@/interfaces/StoreDetailInterface";
import {useStoreDetailStore} from "@/stores/StoreDetailStore";
import {ref} from "vue";

const storeDetailStore = useStoreDetailStore();
const store = storeDetailStore.storeData as StoreResponse;

const isLoading = storeDetailStore.isLoading;

const isExpanded = ref(false);

const navigateTo = (url: string) => {
  if (url.startsWith('https://')) {
    window.open(url, '_blank');
  } else {
    window.open(`https://${url}`, '_blank');
  }
};

const navigateToInstar = (username: string) => {
  window.open(`https://www.instagram.com/${username}/`, '_blank');
};

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

.category-chip {
  max-width: 200px;
  display: inline-block;
  border-radius: 100px;
  background-color: #F5F5F7;
  padding: 5px 10px;
  margin-right: 6px;
}
</style>