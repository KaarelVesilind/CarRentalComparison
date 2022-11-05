<script setup>
import OffersListContent from "@/components/offers/OffersListContent.vue";
defineProps({
  offers: {
    required: true,
  },
});
</script>
<template>
  <div>
    <OffersListContent :offers="offers" />
  </div>
</template>
