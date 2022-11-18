<template>
  <div
    class="flex overflow-hidden bg-gray-300 gap-1 rounded-md hover:cursor-pointer"
    style="padding: 0 3px"
  >
    <div
      class="bg-white -rotate-90 leading-none text-lg cursor-pointer"
      id="sort-up"
      style="padding: 7px; border-radius: 4px 4px 0 0"
      :style="
        sortParamsObj.sortState === SortState.UP ? 'background: #e5e7eb' : ''
      "
      @click="sortParamsObj.sortState = SortState.UP"
    >
      ➜
    </div>
    <div
      class="bg-white rotate-90 leading-none text-lg cursor-pointer"
      id="sort-down"
      style="padding: 7px; border-radius: 4px 4px 0 0"
      :style="
        sortParamsObj.sortState === SortState.DOWN ? 'background: #e5e7eb' : ''
      "
      @click="sortParamsObj.sortState = SortState.DOWN"
    >
      ➜
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/rental";
import { SortState } from "@/models/enums/SortState";

const sortParamsObj = ref(useStore().sortParamsObj);
</script>
