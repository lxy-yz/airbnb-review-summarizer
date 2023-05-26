<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { apiKey } from '~/logic/storage'

const [show, toggle] = useToggle(false)

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>Popup</div>
    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">
      Open Options
    </button>

    <form action="m-4">
      <div class="mt-2">
        <label for="apiKeys">OpenAI API Key</label>
        <div>{{ apiKey }}</div>
        <input
          id="apiKeys"
          v-model="apiKey"
          :type="show ? 'text' : 'password'"
          autofocus
          class="
            mt-1
            block
            w-full
            rounded-md
            bg-gray-100
            border-transparent
            focus:border-gray-500 focus:bg-white focus:ring-0
          "
          @click="$event => toggle()"
        >
      </div>
    </form>
  </main>
</template>
