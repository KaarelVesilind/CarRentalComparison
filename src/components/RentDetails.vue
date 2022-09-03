<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/rental";
const store = useStore();
const distance = ref(0);
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);

const calculate = () => {
  store.setRentDetails({
    distance: distance.value,
    days: days.value,
    hours: hours.value,
    minutes: minutes.value,
  });
};
</script>
<template>
  <div>
    <label for="distance">Distance</label>
    <input type="number" v-model="distance" />
    <div class="flex flex-row">
      <label> Days</label>
      <input type="number" v-model="days" />
      <label> Hours</label>
      <input type="number" v-model="hours" />
      <label> Minutes</label>
      <input type="number" v-model="minutes" />
    </div>
    <button @click="calculate">Calculate</button>
  </div>
</template>
