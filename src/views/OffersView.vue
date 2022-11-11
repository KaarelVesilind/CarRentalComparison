<template>
  <main>
    <OffersHeader @search="search" />
    <OffersContent :offers="offers" />
    <div v-if="offers.length === 0" class="grid text-center gap-4">
      <h2>No results!</h2>
      <span
        class="text-blue-900 font-bold no-underline hover:underline"
        @click="clearOnPress"
      >
        Clear all search conditions
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

const offers = ref([]);
const store = useStore();
let filterConditionsObj = ref(store.filterConditionsObj);

onMounted(() => {
  search();
});

const sortOffers = (offers, sortState, sortingFieldName) => {
  if (offers.length === 0) return [];
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
    filterConditionsObj.value
  );
  const sortState = store.sortParamsObj.sortState;
  const sortingFieldName = store.sortParamsObj.sortingFieldName;
  offers.value = sortOffers(filteredOffers, sortState, sortingFieldName);
};

const clearOnPress = () => {
  filterConditionsObj = JSON.parse(JSON.stringify(FilterConditionsObj));
  // Maybe also clear searchParamsObj?
  search();
};

watchEffect(() => {
  const sortState = store.sortParamsObj.sortState;
  const sortingFieldName = store.sortParamsObj.sortingFieldName;
  offers.value = sortOffers(offers.value, sortState, sortingFieldName);
});
</script>
