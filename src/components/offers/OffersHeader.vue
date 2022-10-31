<script setup></script>
<template>
  <div>
    <OffersSearch />
    <OffersFilter />
    <button>Search</button>
  </div>
</template>
<script>
import OffersSearch from "@/components/offers/OffersSearch.vue";
import OffersFilter from "@/components/offers/OffersFilter.vue";
export default {
  components: { OffersFilter, OffersSearch },
};
</script>
