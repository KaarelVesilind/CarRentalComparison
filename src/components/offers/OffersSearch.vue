<template>
  <div class="grid gap-2">
    <div class="flex">
      <p>Days</p>
      <input
        type="text"
        inputmode="numeric"
        v-model="searchParamsObj.days"
        class="w-14"
        placeholder="0"
        id="days"
        autocomplete="off"
        @keydown="allowNumbersOnly"
        @input="intOutput('days')"
        @change="emptyToZero('days')"
      />
      <p>Hours</p>
      <input
        type="text"
        inputmode="numeric"
        v-model="searchParamsObj.hours"
        class="w-14"
        @keydown="allowNumbersOnly"
        placeholder="0"
        id="hours"
        @input="intOutput('hours')"
        @change="emptyToZero('hours')"
      />
      <p>Minutes</p>
      <input
        type="text"
        inputmode="numeric"
        v-model="searchParamsObj.minutes"
        class="w-14"
        id="minutes"
        placeholder="0"
        @input="intOutput('minutes')"
        @change="emptyToZero('minutes')"
        @keydown="allowNumbersOnly"
      />
    </div>
    <div class="flex">
      <p>Distance</p>
      <input
        type="text"
        inputmode="numeric"
        v-model="searchParamsObj.distance"
        class="w-20"
        placeholder="0"
        id="distance"
        @keydown="allowNumbersOnly"
        @input="intOutput('distance')"
        @change="emptyToZero('distance')"
      />
      <p>kilometers</p>
    </div>
    <div class="flex">
      <p>Start</p>
      <select class="w-24" v-model="store.searchParamsObj.start" id="startCity">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
      <p>End</p>
      <select class="w-24" v-model="store.searchParamsObj.end" id="endCity">
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
import { ref, computed } from "vue";

const allowNumbersOnly = (e) => {
  if (e.key.length === 1 && !parseInt(e.key) && e.key !== "0") {
    e.preventDefault();
  }
};

const searchParamsObj = computed(() => {
  return store.searchParamsObj;
});
const emptyToZero = (field) => {
  if (store.searchParamsObj[field] === "") {
    store.searchParamsObj[field] = 0;
  }
};
const intOutput = (field) => {
  if (store.searchParamsObj[field] === "") {
    return;
  }

  const value = parseInt(store.searchParamsObj[field]);
  const floatValue = parseFloat(store.searchParamsObj[field]);
  if (
    !(
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(floatValue) === value
    )
  ) {
    store.searchParamsObj[field] = 0;
    return;
  }
  store.searchParamsObj[field] = parseInt(value);
};

const cities = ref(
  new Set(beast.cities, bolt.cities, citybee.cities, elmo.cities)
);
const store = useStore();
</script>

<style scoped>
input,
select {
  border: 1px solid #e8e8e8 !important;
  border-radius: 5px !important;
  background: white !important;
}
</style>
