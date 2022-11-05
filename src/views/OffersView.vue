<script setup>
import OffersHeader from "@/components/offers/OffersHeader.vue";
import OffersContent from "@/components/offers/OffersContent.vue";
</script>

<template>
  <main>
    <OffersHeader @search="search" />
    <OffersContent :offers="offers"  class="max-w-2xl mt-4" />
  </main>
</template>
<script>
import { useStore } from "@/stores/rental";
import OffersCalculator from "@/bll/calculations/OffersCalculator";
import OffersFilter from "@/bll/OffersFilter";

export default {
  name: "OfferSearch",
  data() {
    return {
      store: useStore(),
      offers: [],
    };
  },
  methods: {
    search() {
      const offersCalculator = new OffersCalculator();
      const offersFilter = new OffersFilter();
      const calculatedOffers = offersCalculator.calculateOffers(
        this.store.searchParamsObj
      );
      this.offers = offersFilter.filter(
        calculatedOffers,
        this.store.filterConditionsObj
      );
    },
  },
};
</script>
