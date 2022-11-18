<script setup>
import { ref } from "vue";
const joke = ref("");

const getJoke = async () => {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  const data = await response.json();
  joke.value = data.value;
};
</script>

<template>
  <main>
    <p>
      Rentalize rakendus on loodud lühirenditeenuste autode hindade
      võrdlemiseks. Kuna igal teenusepakkujal on erinev hinnastusmudel, siis on
      väga keeruline hinnata milline auto tuleb reisi jaoks odavaim.
    </p>
    <p>
      Rakenduses tuleb sisestada reisi parameetrid ning vajutada 'search' nuppu.
      Seejärel kuvatakse kõik autod, mis vastavad sisestatud parameetritele. Kui
      soovite filtreerida autode hulka, siis saate seda teha vajutades "filters"
      nupule. Kui soovite sorteerida autode hulka, siis saate seda teha paremal
      oleva sorteerimise abil. Kui soovite kustutada kõik otsingu ja
      filtreerimise parameetrid, siis vajutage 'clear' nuppu.
    </p>
    <p>
      Rakenduse autorid on: Kaarel Vesilind, Villem Madisson, Anne Siitan, Anete
      Merilin Martmaa
    </p>
    <br />
    <button
      class="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg"
      @click="getJoke"
    >
      click here for chuck norris joke :)
    </button>
    <p>{{ joke }}</p>
  </main>
</template>
