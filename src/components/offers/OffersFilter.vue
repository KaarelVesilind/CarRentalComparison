<template>
  <div>
    <div class="flex justify-center">
      <div
        class="flex gap-3 hover:cursor-pointer"
        id="filter-opener"
        @click="openFilter"
      >
        <div class="text-blue-900 font-bold">Filters</div>
        <div class="flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="filterOpen ? '' : 'transform rotate-180'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="transition-[height] ease-in-out delay-150 duration-500 overflow-hidden h-0"
      id="filter-grow"
    >
      <div class="grid pt-2.5 gap-2" id="filter-wrapper">
        <div class="flex items-center">
          <span style="width: 90px">Providers:</span>
          <multiselect
            v-model="providerValues"
            :options="providerOptions"
            @select="(option) => selectOption('provider', option)"
            @remove="(option) => removeOption('provider', option)"
            :multiple="true"
            :show-pointer="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="false"
            placeholder="Select providers"
            label="name"
            track-by="name"
            class="max-w-[74%] lg:max-w-[50%]"
            id="provider-multi-select"
          />
        </div>

        <div class="flex items-center">
          <span style="width: 90px">Motor type:</span>
          <multiselect
            v-model="motorTypeValues"
            :options="motorTypeOptions"
            @select="(option) => selectOption('motorType', option)"
            @remove="(option) => removeOption('motorType', option)"
            :multiple="true"
            :show-pointer="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="false"
            placeholder="Select motor type"
            label="name"
            track-by="name"
            class="max-w-[74%] lg:max-w-[50%]"
            id="motor-type-multi-select"
          />
        </div>

        <div class="flex items-center">
          <span style="width: 90px">Body type:</span>
          <multiselect
            v-model="bodyTypeValues"
            :options="bodyTypeOptions"
            @select="(option) => selectOption('bodyType', option)"
            @remove="(option) => removeOption('bodyType', option)"
            :multiple="true"
            :show-pointer="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="false"
            placeholder="Select body type"
            label="name"
            track-by="name"
            class="max-w-[74%] lg:max-w-[50%]"
            id="body-type-multi-select"
          >
            <template v-slot:option="props">
              <div class="flex gap-3">
                <img
                  :src="
                    getAsset(
                      `car_body_types/${props.option.value.toLowerCase()}.png`
                    )
                  "
                  :alt="`car body type ${props.option.value}`"
                  style="width: 30px; height: 20px"
                />
                <span>{{ props.option.name }}</span>
              </div>
            </template>
          </multiselect>
        </div>

        <div class="flex items-center my-1">
          <span style="width: 90px">Gearbox:</span>
          <GearboxSelector />
        </div>

        <div class="flex items-center">
          <span style="width: 90px">Pet friendly:</span>
          <input
            type="checkbox"
            id="pet-friendly-checkbox"
            class="hover:cursor-pointer"
            v-model="store.filterConditionsObj.petFriendly"
            style="width: 24px; height: 24px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import getAsset from "@/utils";
import Multiselect from "vue-multiselect";
import { ref, watch } from "vue";
import { useStore } from "@/stores/rental";
import GearboxSelector from "@/components/global/GearboxSelector.vue";
const store = useStore();
let filterOpen = ref(false);

const providerOptions = [
  { name: "Beast", value: "beast" },
  { name: "Bolt", value: "bolt" },
  { name: "CityBee", value: "citybee" },
  { name: "Elmo", value: "elmo" },
  { name: "Avis", value: "avis" },
];

const bodyTypeOptions = [
  { name: "Hatchback", value: "HATCHBACK" },
  { name: "Sedan", value: "SEDAN" },
  { name: "Touring", value: "TOURING" },
  { name: "Van", value: "VAN" },
  { name: "Cabriolet", value: "CABRIOLET" },
];

const motorTypeOptions = [
  { name: "Petrol", value: "PETROL" },
  { name: "Hybrid", value: "HYBRID" },
  { name: "Electric", value: "ELECTRIC" },
];

const providerValues = ref([]);
const bodyTypeValues = ref([]);
const motorTypeValues = ref([]);

watch(
  () => store.filterConditionsObj,
  (newVal) => {
    bodyTypeValues.value = bodyTypeOptions.filter(
      (bodyTypeOption) => newVal.bodyType[bodyTypeOption.value]
    );
    motorTypeValues.value = motorTypeOptions.filter(
      (motorTypeOption) => newVal.motorType[motorTypeOption.value]
    );
    providerValues.value = providerOptions.filter(
      (providerOption) => newVal.provider[providerOption.value]
    );
  }
);

const selectOption = (fieldName, option) => {
  store.filterConditionsObj[fieldName][option.value] = true;
};

const removeOption = (fieldName, option) => {
  store.filterConditionsObj[fieldName][option.value] = false;
};

const openFilter = () => {
  filterOpen.value = !filterOpen.value;
  const growDiv = document.getElementById("filter-grow");
  if (growDiv.clientHeight) {
    growDiv.style.height = 0;
    growDiv.style.overflow = "hidden";
  } else {
    const wrapper = document.getElementById("filter-wrapper");
    growDiv.style.height = wrapper.clientHeight + "px";
    setTimeout(() => {
      growDiv.style.overflow = "inherit";
    }, 500);
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
