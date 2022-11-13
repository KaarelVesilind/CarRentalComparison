<template>
  <div
    class="flex overflow-hidden bg-gray-300 p-0.5 gap-0.5 rounded-md hover:cursor-pointer"
  >
    <div
      class="bg-white p-1.5 leading-none"
      id="gearbox-all"
      style="border-radius: 4px 0 0 4px"
      :style="
        store.filterConditionsObj.gearbox.MANUAL ===
        store.filterConditionsObj.gearbox.AUTOMATIC
          ? 'background: #e5e7eb'
          : ''
      "
      @click="
        store.filterConditionsObj.gearbox.AUTOMATIC = false;
        store.filterConditionsObj.gearbox.MANUAL = false;
      "
    >
      All
    </div>
    <div
      class="bg-white p-1.5 leading-none"
      id="gearbox-automatic"
      :style="
        store.filterConditionsObj.gearbox.AUTOMATIC ? 'background: #e5e7eb' : ''
      "
      @click="
        store.filterConditionsObj.gearbox.AUTOMATIC = true;
        store.filterConditionsObj.gearbox.MANUAL = false;
      "
    >
      Automatic
    </div>
    <div
      class="bg-white p-1.5 leading-none"
      id="gearbox-manual"
      style="border-radius: 0 4px 4px 0"
      :style="
        store.filterConditionsObj.gearbox.MANUAL ? 'background: #e5e7eb' : ''
      "
      @click="
        store.filterConditionsObj.gearbox.AUTOMATIC = false;
        store.filterConditionsObj.gearbox.MANUAL = true;
      "
    >
      Manual
    </div>
  </div>
</template>
<script setup>
import { useStore } from "@/stores/rental";

const store = useStore();
</script>
