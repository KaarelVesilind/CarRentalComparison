<script setup></script>
<template>
  <div>
    <nav
      class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-t-lg dark:bg-gray-900"
    >
      <div
        class="container flex flex-wrap justify-between items-center mx-auto"
      >
        <router-link class="flex items-center" to="/">
          <img
            src="/src/assets/logo.png"
            class="mr-3 h-6 sm:h-9"
            alt="Rentalize Logo"
          />
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Rentalize</span
          >
        </router-link>
        <div id="navbar-default">
          <ul class="flex gap-4">
            <li>
              <router-link
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                to="/"
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link
                class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                to="/about"
                >About</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
