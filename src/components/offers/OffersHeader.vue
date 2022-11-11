<script setup>
import OffersFilter from "@/components/offers/OffersFilter.vue";
import OffersSearch from "@/components/offers/OffersSearch.vue";
import OffersSort from "@/components/offers/OffersSort.vue";
import { useStore } from "@/stores/rental";
import { ref, computed } from "vue";
const store = useStore();
const searchParamsObj = ref(store.searchParamsObj);
const invalidValues = computed(() => {
  return (
    searchParamsObj.value.days < 0 ||
    searchParamsObj.value.hours < 0 ||
    searchParamsObj.value.minutes < 0 ||
    searchParamsObj.value.minutes > 59 ||
    searchParamsObj.value.hours > 23 ||
    searchParamsObj.value.distance < 0
  );
});

const emit = defineEmits(["search"]);
const search = () => {
  if (invalidValues.value) {
    return;
  }
  emit("search");
};
</script>

<template>
  <div>
    <OffersSearch />
    <OffersFilter />
    <div class="flex justify-between">
      <button
      id="search-button"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          :class="invalidValues ? 'opacity-50 cursor-not-allowed' : ''"
          @click="search"
      >
        Search
      </button>

      <OffersSort />
    </div>
    <p v-if="invalidValues" class="text-red-500 font-bold">
      Invalid time or distance
    </p>
  </div>
</template>
