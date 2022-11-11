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
      </div>
    </div>
    <div class="flex justify-center">
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
    <div v-if="openDetails">
      <div class="text-center mb-2">
        <p v-if="provider === 'citybee'" class="inline" id="to-app">
          💰 Cashback {{ getCashback }}€
        </p>
      </div>
      <div class="flex flex-row justify-around mb-2">
        <a :href="appLink" target="”_blank”">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            To {{ provider.toUpperCase() }} App
          </button>
        </a>
        <a
          v-if="canPreOrder"
          :href="preOrderLink"
          target="”_blank”"
          id="pre-order"
        >
          <button
            class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            @click="openDetails = !openDetails"
          >
            Pre-Order for
            {{ preOrderCost === 0 ? "FREE" : preOrderCost + "€" }}
          </button>
        </a>
      </div>
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
const canPreOrder = ref(false);
const preOrderCost = ref(-1);

// watch offers prop and update price
watch(
  () => props.offer,
  () => {
    _initializePrice();
  }
);

const provider = ref(props.offer.provider.toLowerCase());
const _initializePrice = () => {
  price.value = props.offer.price;
  const priceDetails = props.offer.priceDetails;
  if (
    priceDetails.package &&
    priceDetails.package.price < priceDetails.normalPrice
  ) {
    const packageDetails = priceDetails.package;
    const monthsText =
      packageDetails.months > 0 ? packageDetails.months + " months " : "";
    const weeksText =
      packageDetails.weeks > 0 ? packageDetails.weeks + " weeks " : "";
    const daysText =
      packageDetails.days > 0 ? packageDetails.days + " days " : "";
    const hoursText =
      packageDetails.hours > 0 ? packageDetails.hours + " hours " : "";
    extraInfo.value = `${monthsText}${weeksText}${daysText}${hoursText}${packageDetails.distance} km `;
    price.value = priceDetails.package.price;
    usePackage.value = true;
  }

  if (priceDetails.preOrder >= 0) {
    canPreOrder.value = true;
    preOrderCost.value = priceDetails.preOrder;
    if (Math.round(priceDetails.preOrder) !== priceDetails.preOrder) {
      preOrderCost.value = priceDetails.preOrder.toFixed(2);
    }
    return;
  }
  canPreOrder.value = false;
  preOrderCost.value = -1;
};
_initializePrice();

const getCashback = computed(() => {
  const cashback = price.value * 0.07;
  return cashback.toFixed(2);
});

const openDetails = ref(false);

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

const preOrderLink = computed(() => {
  switch (provider.value) {
    case "beast":
      return "https://beast.rent/booking";
    case "citybee":
      return "https://citybee.ee/en/car-delivery/";
    case "elmo":
      return "https://rent.elmorent.ee/et/PreOrders";
    default:
      throw "/";
  }
});

const appLink = computed(() => {
  if (provider.value === "bolt") {
    return "https://bolt.onelink.me/sbJ2/7c3bdcee";
  }

  // Let's make sure what platform is used
  const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (isAndroid) {
    switch (provider.value) {
      case "beast":
        return "https://play.google.com/store/apps/details?id=co.electricbeast.beast";
      case "citybee":
        return "https://play.google.com/store/apps/details?id=com.primeleasing.citybee";
      case "elmo":
        return "https://play.google.com/store/apps/details?id=ee.elmorent.rent&hl=en&gl=US";
      default:
        throw "/";
    }
  } else if (isIOS) {
    switch (provider.value) {
      case "beast":
        return "https://apps.apple.com/us/app/beast-rent/id1521729069";
      case "citybee":
        return "https://apps.apple.com/ee/app/citybee-shared-mobility/id966537355";
      case "elmo":
        return "https://apps.apple.com/ee/app/elmo-rent/id1567760991";
      default:
        throw "/";
    }
  } else {
    switch (provider.value) {
      case "beast":
        return "https://beast.rent/";
      case "citybee":
        return "https://citybee.ee/";
      case "elmo":
        return "https://elmorent.ee/";
      default:
        throw "/";
    }
  }
});
</script>
