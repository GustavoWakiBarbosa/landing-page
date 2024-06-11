<script setup lang="ts">
const scrollToId = <Function>inject("scrollToId");
</script>

<template>
  <button
    class="py-[0.88rem] px-4 border border-orion-secondary-50 hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-secondary-50 w-full transition duration-200"
    @click="scrollToId('#form')"
  >
    Faça um teste grátis
  </button>
</template>
