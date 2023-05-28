<script setup lang="ts">
const appName = __NAME__
</script>

<template>
  <div class="flex items-center gap-3 -mx-4 px-6 py-6 bg-black text-white">
    <img src="/assets/airbnb_openai.png" class="icon-btn w-6 h-6" alt="extension icon">
    <h1 class="text-lg font-light">
      {{ appName }}
    </h1>
  </div>
</template>
