<script setup>
import OffersListContent from "@/components/offers/OffersListContent.vue";
defineProps({
  offers: {
    required: true,
  },
});
</script>
<template>
  <div class="max-w-2xl mt-4">
    <OffersListContent :offers="offers" />
  </div>
</template>
