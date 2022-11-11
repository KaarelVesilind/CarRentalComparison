<script setup>
import OffersFilter from "@/components/offers/OffersFilter.vue";
import OffersSearch from "@/components/offers/OffersSearch.vue";
</script>

<template>
  <div>
    <OffersSearch />
    <OffersFilter />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      id="search-button"
      @click="$emit('search')"
    >
      Search
    </button>
  </div>
</template>
