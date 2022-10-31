<script setup>
import { useStore } from "@/stores/rental";
import { computed } from "vue";
import OffersListCard from "@/components/offers/OffersListCard.vue";
const store = useStore();
const offers = computed(() => store.offers);
</script>
<template>
  <div v-if="offers">
    <div v-for="offer in offers" :key="offer.id">
      <OffersListCard
        :offer=offer
      />
    </div>
  </div>
</template>
