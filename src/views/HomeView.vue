<script setup>
import OffersView from "@/views/OffersView.vue";
import { pageview } from "vue-gtag";
pageview("/about");
</script>

<template>
  <main>
    <!--    OffersView  is right now our home view-->
    <OffersView />
  </main>
</template>
