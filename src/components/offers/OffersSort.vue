<template>
  <div class="flex items-center gap-2">
    <span> Sort: </span>

    <select v-model="sortParamsObj.sortingFieldName">
      <option
        v-for="option in sortingFieldOptions"
        :value="option.value"
        :key="'sortingFieldName-' + option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <sort-state-selector />
  </div>
</template>
<script setup>
import { useStore } from "@/stores/rental";
import { ref } from "vue";
import SortStateSelector from "@/components/global/SortStateSelector.vue";

const sortingFieldOptions = ref([
  { text: "Price", value: "price" },
  { text: "Provider", value: "provider" },
  { text: "Name", value: "name" },
  { text: "Gearbox", value: "gearbox" },
  { text: "Body type", value: "bodyType" },
]);

const sortParamsObj = ref(useStore().sortParamsObj);
</script>
