<template>
  <div>filter here</div>
</template>
<script setup>
import { useStore } from "@/stores/rental";
import { ref } from "vue";

const filterConditionsObj = ref(useStore().filterConditionsObj);
</script>
