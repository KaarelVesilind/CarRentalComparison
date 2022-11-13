<template>
  <div class="flex items-center">
    <span> Sort: </span>

    <select v-model="sortParamsObj.sortingFieldName" class="ml-2" style="height: 32px" id="sort">
      <option
        v-for="option in sortingFieldOptions"
        :value="option.value"
        :key="'sortingFieldName-' + option.value"
      >
        {{ option.text }}
      </option>
    </select>
    <sort-state-selector class="ml-2.5" />
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

<style scoped>
select {
  border: 1px solid #e8e8e8 !important;
  border-radius: 5px !important;
  background: white !important;
}
</style>
