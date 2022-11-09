<template>
  <div
    :class="'h-min-28 ' + backgroundColor"
    @click="openDetails = !openDetails"
  >
    <div class="flex p-2 gap-2">
      <img
        :src="getAsset(offer.car.imageUrl ?? 'no-image-available.png')"
        class="rounded self-center"
        alt="car image"
        style="width: 112px; height: 78px"
        :style="offer.car.imageUrl ? '' : 'padding: 14px 18px'"
      />
      <div class="flex flex-col justify-center">
        <div
          class="flex flex-wrap gap-x-2 whitespace-nowrap content-center sm:max-w-sm max-w-xl"
        >
          <span class="text-xl font-semibold"> {{ price.toFixed(2) }} € </span>

          <img
            :src="getAsset(`providers/${provider}/${provider}-logo.png`)"
            alt="provider logo"
            style="height: 24px"
            :class="provider === 'bolt' ? 'mt-1 mb-1' : ''"
          />

          <span>
            {{ offer.car.name }}
          </span>
        </div>
        <div
          class="flex flex-wrap gap-2 whitespace-nowrap content-center sm:max-w-sm max-w-xl"
        >
          <img
            v-for="icon in icons"
            :src="icon.src"
            :alt="icon.alt"
            :key="icon.name"
            style="height: 24px"
          />
        </div>

        <span v-if="usePackage">📦 {{ extraInfo }}</span>
        <div
          v-if="usePackage || provider === 'citybee'"
          class="flex justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            :class="openDetails ? 'transform rotate-180' : ''"
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
    <div v-if="openDetails">
      <p v-if="provider === 'citybee'">💰 Cashback {{ getCashback }}€</p>
      <p v-if="usePackage">
        Cost without package: {{ normalPrice.toFixed(2) }}€
      </p>
    </div>
  </div>
</template>
<script setup>
import getAsset from "@/utils";
import { computed, ref, watch } from "vue";

const props = defineProps({
  offer: {
    required: true,
  },
});

const price = ref(0);
const extraInfo = ref("");
const usePackage = ref(false);
const normalPrice = ref(0);

// watch offers prop and update price
watch(
  () => props.offer,
  () => {
    _initializePrice();
  }
);

const _initializePrice = () => {
  const offerPrice = props.offer.price;
  if (typeof offerPrice === "object") {
    if (offerPrice.package.price < offerPrice.normalPrice) {
      const packageDetails = offerPrice.package;
      const monthsText =
        packageDetails.months > 0 ? packageDetails.months + " months " : "";
      const weeksText =
        packageDetails.weeks > 0 ? packageDetails.weeks + " weeks " : "";
      const daysText =
        packageDetails.days > 0 ? packageDetails.days + " days " : "";
      const hoursText =
        packageDetails.hours > 0 ? packageDetails.hours + " hours " : "";
      extraInfo.value = `Use package: ${monthsText}${weeksText}${daysText}${hoursText}${packageDetails.distance} km `;
      normalPrice.value = offerPrice.normalPrice;
      price.value = offerPrice.package.price;
      usePackage.value = true;
    } else {
      price.value = offerPrice.price;
      normalPrice.value = offerPrice.price;
      usePackage.value = false;
    }
  } else {
    price.value = offerPrice;
  }
  return { extraInfo, price };
};
_initializePrice();

const getCashback = computed(() => {
  const cashback = price.value * 0.07;
  return cashback.toFixed(2);
});

const openDetails = ref(false);

const provider = ref(props.offer.provider.toLowerCase());

const defaultIcons = [
  {
    name: "BodyType",
    src: getAsset(
      `car_body_types/${props.offer.car.bodyType.toLowerCase()}.png`
    ),
    alt: `car body type ${props.offer.car.bodyType.toLowerCase()}`,
  },
  {
    name: "GearBox",
    src: getAsset(`${props.offer.car.gearbox.toLowerCase()}-logo.png`),
    alt: `gearbox ${props.offer.car.gearbox.toLowerCase()}`,
  },
];

const icons = computed(() => {
  const icons = [...defaultIcons];
  // Adding motorType icons
  if (
    props.offer.car.motorType === "ELECTRIC" ||
    props.offer.car.motorType === "HYBRID"
  ) {
    icons.push({
      name: "MotorType",
      src: getAsset("electric-logo.png"),
      alt: "motortype electric",
    });
  }
  if (
    props.offer.car.motorType === "PETROL" ||
    props.offer.car.motorType === "HYBRID"
  ) {
    icons.push({
      name: "MotorType",
      src: getAsset("petrol-logo.png"),
      alt: "motortype petrol",
    });
  }
  // Adding petFriendly icon
  if (props.offer.car.petFriendly) {
    icons.push({
      name: "PetFriendly",
      src: getAsset("pet-friendly-logo.png"),
      alt: "pet friendly logo",
    });
  }
  return icons;
});

const backgroundColor = computed(() => {
  switch (provider.value) {
    case "beast":
      return "bg-gray-50";
    case "bolt":
      return "bg-green-50";
    case "citybee":
      return "bg-orange-50";
    case "elmo":
      return "bg-blue-50";
    default:
      throw "missing provider: " + props.offer.provider;
  }
});
</script>
