<script setup>
import OffersFilter from "@/components/offers/OffersFilter.vue";
import OffersSearch from "@/components/offers/OffersSearch.vue";
import OffersSort from "@/components/offers/OffersSort.vue";
</script>

<template>
  <div>
    <OffersSearch />
    <OffersFilter />
    <div class="flex justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        @click="$emit('search')"
      >
        Search
      </button>

      <OffersSort />
    </div>
  </div>
</template>
