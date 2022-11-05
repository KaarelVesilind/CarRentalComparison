<script setup>
import { computed } from "vue";

const props = defineProps({
  offer: {
    required: true,
  },
});

const backgroundColor = computed(() => {
  switch (props.offer.provider) {
    case "BEAST":
      return "bg-gray-50";
    case "BOLT":
      return "bg-green-50";
    case "CITYBEE":
      return "bg-orange-50";
    case "ELMO":
      return "bg-blue-50";
    default:
      throw "missing provider: " + props.offer.provider;
  }
});

const providerLogo = computed(() => {
  switch (props.offer.provider) {
    case "BEAST":
      return "/src/assets/providers/beast/beast-logo.png";
    case "BOLT":
      return "/src/assets/providers/bolt/bolt-logo.png";
    case "CITYBEE":
      return "/src/assets/providers/citybee/citybee-logo.png";
    case "ELMO":
      return "/src/assets/providers/elmo/elmo-logo.png";
    default:
      throw "missing provider: " + props.offer.provider;
  }
});
const gearBoxLogo = computed(() => {
  switch (props.offer.car.gearBox) {
    case "AUTOMATIC":
      return "/src/assets/automatic-logo.png";
    case "MANUAL":
      return "/src/assets/manual-logo.png";
    default:
      throw "missing gearbox: " + props.offer.car.gearBox;
  }
});
const bodyTypeLogo = computed(() => {
  switch (props.offer.car.bodyType) {
    case "SEDAN":
      return "/src/assets/car_body_types/sedan.png";
    case "TOURING":
      return "/src/assets/car_body_types/touring.png";
    case "HATCHBACK":
      return "/src/assets/car_body_types/hatchback.png";
    case "CABRIOLET":
      return "/src/assets/car_body_types/cabriolet.png";
    case "VAN":
      return "/src/assets/car_body_types/van.png";
    default:
      throw (
        "missing car bodyType: " + props.offer.provider + props.offer.car.name
      );
  }
});
</script>
<template>
  <div :class="'flex p-2 gap-2 h-28 ' + backgroundColor">
    <img
      v-if="offer.car.imageUrl"
      :src="offer.car.imageUrl"
      class="rounded self-center"
      alt="car image"
      style="width: 112px; height: 78px"
    />
    <img
      v-else
      src="/src/assets/no-image-available.png"
      class="rounded self-center"
      alt="car image"
      style="padding: 14px 18px; min-width: 112px; height: 78px"
    />
    <div
      class="flex flex-wrap gap-2 whitespace-nowrap content-center sm:max-w-sm max-w-xl"
    >
      <span class="text-xl"> {{ offer.price }} € </span>

      <img :src="providerLogo" alt="provider logo" style="height: 24px" />

      <span>
        {{ offer.car.name }}
      </span>

      <img
        v-if="
          offer.car.motorType === 'ELECTRIC' || offer.car.motorType === 'HYBRID'
        "
        src="/src/assets/electric-logo.png"
        alt="motortype electric"
        style="height: 24px"
      />
      <img
        v-if="
          offer.car.motorType === 'PETROL' || offer.car.motorType === 'HYBRID'
        "
        src="/src/assets/petrol-logo.png"
        alt="motortype petrol"
        style="height: 24px"
      />
      <img :src="bodyTypeLogo" alt="car body type logo" style="height: 24px" />
      <img
        v-if="offer.car.petFriendly"
        src="/src/assets/pet-friendly-logo.png"
        alt="pet friendly logo"
        style="height: 24px"
      />
      <img
        v-if="offer.car.gearBox"
        :src="gearBoxLogo"
        alt="gearBox logo"
        style="height: 24px"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
