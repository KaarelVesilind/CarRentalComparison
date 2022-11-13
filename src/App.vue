<style>
@font-face {
  font-family: "Helvetica";
  src: local("Helvetica"),
    url("./src/assets/fonts/Helvetica.ttf") format("truetype");
}

.app {
  font-family: "Helvetica Neue", sans-serif;
}
</style>

<template>
  <div class="flex justify-center sm:mt-10 sm:mb-10 app">
    <div
      class="rounded-lg shadow-2xl shadow-gray-500 bg-white sm:w-2/3 md:w-1/2 max-w-lg"
    >
      <TopNavBar />

      <h2 class="text-center font-bold">Short term car rental comparison</h2>

      <RouterView class="p-4" />
    </div>
  </div>
</template>
<script setup>
import TopNavBar from "@/components/global/TopNavBar.vue";
import { event } from "vue-gtag";

event("page_view", {
  page_title: "Home",
  page_location: "https://kaarelvesilind.github.io/carrentalcomparison/",
  page_path: "/",
});
</script>
