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
      />
      <p>Minutes</p>
      <input
        type="number"
        v-model="searchParamsObj.minutes"
        class="w-14"
        placeholder="0"
      />
    </div>
    <div class="flex flex-row my-1">
      <p>Distance</p>
      <input
        type="number"
        v-model="searchParamsObj.distance"
        class="w-20"
        placeholder="0"
      />
      <p>Kilometers</p>
    </div>
    <div class="flex flex-row">
      <p>Start</p>
      <select class="w-24" v-model="searchParamsObj.start">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
      <p>End</p>
      <select class="w-24" v-model="searchParamsObj.end">
        <option v-for="city in cities" :key="city">{{ city }}</option>
      </select>
    </div>
  </div>
</template>
<script>
import { useStore } from "@/stores/rental";
import { beast } from "@/providers/shortTerm/beast";
import { bolt } from "@/providers/shortTerm/bolt";
import { citybee } from "@/providers/shortTerm/citybee";
import { elmo } from "@/providers/shortTerm/elmo";

export default {
  name: "OfferSearch",
  data() {
    return {
      cities: new Set(beast.cities, bolt.cities, citybee.cities, elmo.cities),
    };
  },
  computed: {
    searchParamsObj() {
      const store = useStore();
      return store.searchParamsObj;
    },
  },
};
</script>
