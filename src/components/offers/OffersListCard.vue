<script>
export default {
  props: ["offer"],
};
</script>
<template>
  <div class="flex p-4 gap-4">
    <img
      v-if="offer.car.imageUrl"
      :src="offer.car.imageUrl"
      height="64"
      width="96"
      class="rounded"
      alt="car image"
    />
    <img
      v-else
      src="/src/assets/no-image-found.png"
      height="64"
      width="96"
      class="rounded"
      alt="car image"
    />
    <div class="flex gap-2 text-xs">
      <p>
        {{ offer.price }}
      </p>
      <p>
        {{ offer.provider }}
      </p>
      <p>
        {{ offer.car.name }}
      </p>
      <p>
        {{ offer.car.bodyType }}
      </p>
      <p>
        {{ offer.car.motorType }}
      </p>
      <p>
        {{ offer.car.motorType }}
      </p>
      <p>
        {{ offer.car.petFriendly }}
      </p>
      <p>
        {{ offer.car.gearBox }}
      </p>
    </div>

  </div>
</template>

<style lang="scss" scoped>

</style>
