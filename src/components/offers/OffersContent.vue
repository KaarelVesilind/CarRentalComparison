<script setup></script>
<template>
  <div>
    <OffersListContent
    :offers="offers"
    />
  </div>
</template>
<script>
import OffersListContent from "@/components/offers/OffersListContent.vue";
export default {
  props: ['offers'],
  components: { OffersListContent },
};
</script>
