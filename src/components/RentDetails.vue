<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/rental";
import { beast } from "@/providers/beast";
import { bolt } from "@/providers/bolt";
import { citybee } from "@/providers/citybee";
import { elmo } from "@/providers/elmo";
import { computed } from "vue";

const cities = new Set(beast.cities, bolt.cities, citybee.cities, elmo.cities);

const store = useStore();
const distance = ref(0);
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const showTraditional = ref(false);

const invalidValues = computed(() => {
  return (
    days.value < 0 ||
    hours.value < 0 ||
    minutes.value < 0 ||
    minutes.value > 59 ||
    hours.value > 23 ||
    distance.value < 0
  );
});

const calculate = () => {
  if (invalidValues.value) {
    return;
  }
  store.setRentDetails({
    distance: distance.value || 0,
    days: days.value || 0,
    hours: hours.value || 0,
    minutes: minutes.value || 0,
    showTraditional: showTraditional.value,
  });
};
</script>
<template>
  <div>
    <div class="flex flex-row">
      <p>Days</p>
      <input type="number" v-model="days" class="w-14" />
      <p>Hours</p>
      <input type="number" v-model="hours" class="w-14" />
      <p>Minutes</p>
      <input type="number" v-model="minutes" class="w-14" />
    </div>
    <div class="flex flex-row my-1">
      <p>Distance</p>
      <input type="number" v-model="distance" class="w-20" />
      <input
        id="default-checkbox"
        type="checkbox"
        v-model="showTraditional"
        class="ml-2"
      />
      <p>Show traditional car rentals</p>
    </div>
    <div class="flex flex-row">
      <p>Start</p>
      <select class="w-24">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
      <p>End</p>
      <select class="w-24">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
    </div>
    <div class="w-full text-center sm:text-left left px-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded m-2 w-full sm:w-24"
        @click="calculate"
      >
        Calculate
      </button>
    </div>
    <p v-if="invalidValues" class="text-red-500 font-bold">
      Invalid time or distance
    </p>
  </div>
</template>
