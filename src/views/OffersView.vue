<template>
  <main>
    <OffersHeader @search="search" />
    <OffersContent :offers="offers" class="max-w-2xl mt-4" />
  </main>
</template>
<script setup>
import OffersHeader from "@/components/offers/OffersHeader.vue";
import OffersContent from "@/components/offers/OffersContent.vue";
import { useStore } from "@/stores/rental";
import OffersCalculator from "@/bll/calculations/OffersCalculator";
import OffersFilter from "@/bll/OffersFilter";
import { ref } from "vue";

const offers = ref();
const store = useStore();

const search = () => {
  const offersCalculator = new OffersCalculator();
  const offersFilter = new OffersFilter();
  const calculatedOffers = offersCalculator.calculateOffers(
    store.searchParamsObj
  );
  offers.value = offersFilter.filter(
    calculatedOffers,
    store.filterConditionsObj
  );
};
</script>
