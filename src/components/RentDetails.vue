<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/rental";
const store = useStore();
const distance = ref(0);
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const showTraditional = ref(false);

const calculate = () => {
  store.setRentDetails({
    distance: distance.value,
    days: days.value,
    hours: hours.value,
    minutes: minutes.value,
    showTraditional: showTraditional.value,
  });
};
</script>
<template>
  <div>
    <div class="flex flex-row">
      <label> Days</label>
      <input type="number" v-model="days" />
      <label> Hours</label>
      <input type="number" v-model="hours" />
      <label> Minutes</label>
      <input type="number" v-model="minutes" />
      <input
        id="default-checkbox"
        type="checkbox"
        v-model="showTraditional"
        class="ml-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        for="default-checkbox"
        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Show traditional car rentals</label
      >
    </div>
    <label for="distance">Distance</label>
    <input type="number" v-model="distance" />

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
      @click="calculate"
    >
      Calculate
    </button>
  </div>
</template>
