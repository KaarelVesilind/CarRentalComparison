<template>
  <div>filter here</div>
</template>
<script>
import { useStore } from "@/stores/rental";

export default {
  name: "OfferSearch",
  computed: {
    filterConditionsObj() {
      const store = useStore();
      return store.filterConditionsObj;
    },
  },
};
</script>
