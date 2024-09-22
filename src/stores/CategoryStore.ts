import {defineStore} from "pinia";
import {reactive, ref, watch} from "vue";
import {CategoryResponse} from "@/interfaces/CategoryInterface";
import {SearchParams, searchStores} from "@/api/CategoryApi";
import {formatDateRange} from "@/util/util";

export const useCategoryStore = defineStore('category', () => {

  const categoryActiveData = reactive<CategoryResponse>(new CategoryResponse());
  const categoryDeactiveData = reactive<CategoryResponse>(new CategoryResponse());
  const categoryLoading = ref<boolean>(false);
  const categoryError = ref<boolean>(false);
  const searchList = reactive<SearchParams[]>([]);
  const initialActiveParams: SearchParams = {
    categoryId: null,
    startRangeDate: null,
    endRangeDate: null,
    isActive: true,
    keyword: null,
    regionAndCityNames: null,
    page: 0,
    size: 8,
    sortType: "OPEN",
  };

  const initialDeactiveParams: SearchParams = {
    categoryId: null,
    startRangeDate: null,
    endRangeDate: null,
    isActive: false,
    keyword: null,
    regionAndCityNames: null,
    page: 0,
    size: 8,
    sortType: "OPEN",
  };

// reactive 객체 생성
  const searchActiveParams = reactive<SearchParams>({ ...initialActiveParams });
  const searchDeactiveParams = reactive<SearchParams>({ ...initialDeactiveParams });

  watch(searchActiveParams, (newValue) => {
    searchList.length = 0;
    searchList.push({ ...newValue });
  }, { deep: true });

  const formattedList = reactive<string[]>([]);    // 새로운 string[] 저장


  watch(
      searchList,
      (newList) => {
        formattedList.length = 0;
        newList.forEach((item) => {

          if (item.startRangeDate && item.endRangeDate) {
            const formattedDate = formatDateRange(item.startRangeDate, item.endRangeDate);
            formattedList.push(formattedDate);
          }


          if (item.regionAndCityNames) {
            const regionCityArray = item.regionAndCityNames.split(',');
            formattedList.push(...regionCityArray);
          }
        });
      },
      { deep: true } // searchList 내부의 값을 깊게 감지
  );
  const searchActive = async () => {
    categoryLoading.value = true;
    try {
      const response = await searchStores(searchActiveParams);
      searchActiveParams.page = 0;
      Object.assign(categoryActiveData, new CategoryResponse());
      Object.assign(categoryActiveData, response);

    } catch (error) {
      categoryError.value = true;
    } finally {
      categoryLoading.value = false;
    }
  };

  const searchDeactive = async () => {
    categoryLoading.value = true;
    try {
      const response = await searchStores(searchDeactiveParams);
      searchDeactiveParams.page = 0;
      Object.assign(categoryDeactiveData, new CategoryResponse());
      Object.assign(categoryDeactiveData, response);

    } catch (error) {
      categoryError.value = true;
    } finally {
      categoryLoading.value = false;
    }
  };
  async function resetSearchParams() {
    Object.assign(searchActiveParams, initialActiveParams);
    Object.assign(searchDeactiveParams, initialDeactiveParams);
    await searchActive();
    await searchDeactive();
  }

  return {
    categoryActiveData,
    categoryDeactiveData,
    categoryLoading,
    categoryError,
    searchActive,
    searchDeactive,
    searchActiveParams,
    searchDeactiveParams,
    formattedList,
    resetSearchParams
  };
});

