<script setup>
import OffersListCard from "@/components/offers/OffersListCard.vue";
</script>
<template>
  <div v-if="offers && offers.length > 0">
    <div v-for="(offer, index) in offers" :key="offer.id">
      <OffersListCard
        :class="'border-l-2 border-r-2 border-b-2 ' + (index === 0 ? 'border-t-2' : '')"
        :offer="offer"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["offers"],
};
</script>
