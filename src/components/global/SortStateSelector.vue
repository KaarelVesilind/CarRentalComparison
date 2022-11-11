<template>
  <div
    class="flex overflow-hidden bg-gray-300 gap-1.5 rounded-xl"
    style="padding: 0 4px"
  >
    <div
      class="bg-white p-1.5 -rotate-90 leading-none text-lg"
      style="margin: 1px 0; border-radius: 9px 9px 0 0"
      :style="
        sortParamsObj.sortState === SortState.UP ? 'background: #e5e7eb' : ''
      "
      @click="sortParamsObj.sortState = SortState.UP"
    >
      ➜
    </div>
    <div
      class="bg-white p-1.5 rotate-90 leading-none text-lg"
      style="margin: 1px 0; border-radius: 9px 9px 0 0"
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
