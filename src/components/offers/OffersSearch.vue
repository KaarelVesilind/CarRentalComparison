<template>
  <div v-if="searchParamsObj">
    <div class="flex flex-row">
      <p>Days</p>
      <input
        type="number"
        v-model="searchParamsObj.days"
        class="w-14"
        placeholder="0"
        id="days"
        autocomplete="off"
      />
      <p>Hours</p>
      <input
        type="number"
        v-model="searchParamsObj.hours"
        class="w-14"
        placeholder="0"
        id="hours"
      />
      <p>Minutes</p>
      <input
        type="number"
        v-model="searchParamsObj.minutes"
        class="w-14"
        placeholder="0"
        id="minutes"
      />
    </div>
    <div class="flex flex-row my-1">
      <p>Distance</p>
      <input
        type="number"
        v-model="searchParamsObj.distance"
        class="w-20"
        placeholder="0"
        id="distance"
      />
      <p>Kilometers</p>
    </div>
    <div class="flex flex-row">
      <p>Start</p>
      <select class="w-24" v-model="searchParamsObj.start" id="start">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
      <p>End</p>
      <select class="w-24" v-model="searchParamsObj.end" id="finish">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "@/stores/rental";
import { beast } from "@/providers/shortTerm/beast";
import { bolt } from "@/providers/shortTerm/bolt";
import { citybee } from "@/providers/shortTerm/citybee";
import { elmo } from "@/providers/shortTerm/elmo";
import { ref } from "vue";

const cities = ref(
  new Set(beast.cities, bolt.cities, citybee.cities, elmo.cities)
);
const store = useStore();
const searchParamsObj = ref(store.searchParamsObj);
</script>
