<script setup>
import { useStore } from "@/stores/rental";
import { computed } from "vue";
const store = useStore();
const offers = computed(() => store.offers);
</script>
<template>
  <div>
    <h1>Offers</h1>
    <ul v-if="offers">
      <li v-for="offer in offers" :key="offer.id">
        <div class="flex flex-row">
          <h2>{{ offer.price }}€</h2>
          <p>{{ offer.car }}</p>
          <p>{{ offer.provider }}</p>
          <p>{{ offer.extraInfo }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
