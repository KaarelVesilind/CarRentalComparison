<script setup>
import OffersListCard from "@/components/offers/OffersListCard.vue";
defineProps({
  offers: {
    required: true,
  },
});
</script>
<template>
  <div class="rounded-xl">
    <div v-if="offers && offers.length > 0">
      <div v-for="(offer, index) in offers" :key="offer.id">
        <OffersListCard
          :class="
            'border-l-2 border-r-2 border-b-2 ' +
            (index === 0 ? 'border-t-2 rounded-t-xl ' : '') +
            (index === offers.length - 1 ? 'rounded-b-xl' : '')
          "
          :offer="offer"
        />
      </div>
    </div>
  </div>
</template>
