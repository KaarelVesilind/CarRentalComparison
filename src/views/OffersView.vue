<template>
  <main>
    <OffersHeader
      :offers-count="offers.length"
      @search="search"
      @clear="clearOnPress"
    />
    <OffersContent :offers="offers" />
    <div v-if="offers.length === 0" class="grid text-center">
      <h2>No results!</h2>
      <span
        class="text-blue-900 font-bold hover:cursor-pointer"
        @click="clearOnPress"
      >
        Clear all search and filter conditions
      </span>
    </div>
  </main>
</template>
<script setup>
import OffersHeader from "@/components/offers/OffersHeader.vue";
import OffersContent from "@/components/offers/OffersContent.vue";
import { useStore } from "@/stores/rental";
import OffersCalculator from "@/bll/calculations/OffersCalculator";
import OffersFilter from "@/bll/OffersFilter";
import { onMounted, ref, watchEffect } from "vue";
import OffersSort from "@/bll/OffersSort";
import FilterConditionsObj from "@/models/FilterConditionsObj";
import SearchParamsObj from "@/models/SearchParamsObj";

const offers = ref([]);
const store = useStore();

onMounted(() => {
  search();
});

const sortOffers = (offers, sortState, sortingFieldName) => {
  const offersSort = new OffersSort();
  return offersSort.sort(offers, sortState, sortingFieldName);
};

const search = () => {
  const offersCalculator = new OffersCalculator();
  const offersFilter = new OffersFilter();
  const calculatedOffers = offersCalculator.calculateOffers(
    store.searchParamsObj
  );
  const filteredOffers = offersFilter.filter(
    calculatedOffers,
    store.filterConditionsObj
  );
  const sortState = store.sortParamsObj.sortState;
  const sortingFieldName = store.sortParamsObj.sortingFieldName;
  offers.value = sortOffers(filteredOffers, sortState, sortingFieldName);
};

const clearOnPress = () => {
  store.searchParamsObj = JSON.parse(JSON.stringify(SearchParamsObj));
  store.filterConditionsObj = JSON.parse(JSON.stringify(FilterConditionsObj));
  search();
};

watchEffect(() => {
  const sortState = store.sortParamsObj.sortState;
  const sortingFieldName = store.sortParamsObj.sortingFieldName;
  offers.value = sortOffers(offers.value, sortState, sortingFieldName);
});
</script>
