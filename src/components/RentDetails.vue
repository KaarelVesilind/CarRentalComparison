<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/rental";
import { beast } from "@/providers/shortTerm/beast";
import { bolt } from "@/providers/shortTerm/bolt";
import { citybee } from "@/providers/shortTerm/citybee";
import { elmo } from "@/providers/shortTerm/elmo";
import { computed } from "vue";

const cities = new Set(beast.cities, bolt.cities, citybee.cities, elmo.cities);

const store = useStore();
const distance = ref();
const days = ref();
const hours = ref();
const minutes = ref();
const showTraditional = ref(false);
const start = ref("Tallinn");
const end = ref("Tallinn");

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
    start: start.value,
    end: end.value,
  });
};
</script>
<template>
  <div>
    <div class="flex flex-row">
      <p>Days</p>
      <input type="number" v-model="days" class="w-14" placeholder="0" />
      <p>Hours</p>
      <input type="number" v-model="hours" class="w-14" placeholder="0" />
      <p>Minutes</p>
      <input type="number" v-model="minutes" class="w-14" placeholder="0" />
    </div>
    <div class="flex flex-row my-1">
      <p>Distance</p>
      <input type="number" v-model="distance" class="w-20" placeholder="0" />
      <p>Kilometers</p>
      <!-- <input
        id="default-checkbox"
        type="checkbox"
        v-model="showTraditional"
        class="ml-2"
      />
      <p>Include traditional rentals</p> -->
    </div>
    <div class="flex flex-row">
      <p>Start</p>
      <select class="w-24" v-model="start">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
      <p>End</p>
      <select class="w-24" v-model="end">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
    </div>
    <div class="w-full text-center sm:text-left left px-2">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded my-2 w-full sm:w-24 relative"
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
