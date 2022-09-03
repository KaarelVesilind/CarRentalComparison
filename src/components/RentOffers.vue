<script setup>
import { useStore } from "@/stores/rental";
const store = useStore();
const offers = store.offers;
</script>
<template>
  <div>
    <h1>Offers</h1>
    <ul>
      <li v-for="offer in offers" :key="offer.id">
        <div class="flex flex-row">
          <h2>{{ offer.price }}€</h2>
          <p>{{ offer.car }}</p>
          <p>{{ offer.provider }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
