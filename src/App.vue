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
  <div class="flex justify-center mt-10 app">
    <div class="rounded-lg shadow-2xl shadow-gray-500 bg-indigo-50">
      <TopNavBar />

      <h2 class="text-center font-bold">Short term car rental comparison</h2>

      <RouterView class="p-4" />
    </div>
  </div>
</template>
<script>
import TopNavBar from "@/components/global/TopNavBar.vue";
export default {
  components: { TopNavBar },
};
</script>
