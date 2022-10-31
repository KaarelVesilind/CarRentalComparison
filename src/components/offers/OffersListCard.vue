<script>
export default {
  props: ["offer"],
};
</script>
<template>
  <div class="offer-card">
    <div class="empty-car-image" />
    <div>
      {{ offer.price }}
    </div>
    <div>
      {{ offer.provider }}
    </div>
    <div>
      {{ offer.car.name }}
    </div>
    <div>
      {{ offer.car.bodyType }}
    </div>
    <div>
      {{ offer.car.motorType }}
    </div>
    <div>
      {{ offer.car.motorType }}
    </div>
    <div>
      {{ offer.car.petFriendly }}
    </div>
    <div>
      {{ offer.car.gearBox }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/GlobalVariables.scss";

.offer-card {
  border: 1px solid $gray;
  display: flex;
  padding: 8px;
}

.empty-car-image {
  background: $gray;
  width: 100px;
  height: 60px;
  border-radius: 4px;
}
</style>
