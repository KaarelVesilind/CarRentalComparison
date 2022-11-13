<script setup>
import OffersFilter from "@/components/offers/OffersFilter.vue";
import OffersSearch from "@/components/offers/OffersSearch.vue";
import OffersSort from "@/components/offers/OffersSort.vue";
import { useStore } from "@/stores/rental";
import { ref, computed } from "vue";
const store = useStore();
const searchParamsObj = ref(store.searchParamsObj);

defineProps({
  offersCount: {
    required: true,
  },
});

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
  <div class="grid gap-4">
    <OffersSearch />
    <OffersFilter />
    <div class="grid justify-items-center items-center">
      <p v-if="invalidValues" class="text-red-500 font-bold">
        Invalid time or distance
      </p>
      <div class="flex justify-center items-center gap-4">
        <button
          id="search-button"
          class="w-28 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          :class="invalidValues ? 'opacity-50 cursor-not-allowed' : ''"
          @click="search"
        >
          Search
        </button>
        <span
          class="text-blue-900 font-bold no-underline hover:cursor-pointer"
          @click="$emit('clear')"
        >
          Clear
        </span>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div>{{ offersCount }} offers</div>
      <OffersSort />
    </div>
  </div>
</template>

