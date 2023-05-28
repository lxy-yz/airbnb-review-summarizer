<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { apiKey } from '~/logic/storage'

const [show, toggle] = useToggle(false)

// function openOptionsPage() {
//   browser.runtime.openOptionsPage()
// }
</script>

<template>
  <main class="w-[300px] px-4 pb-8 text-center text-gray-700">
    <Logo />
    <!-- <div>Popup</div> -->
    <!-- <SharedSubtitle /> -->
    <!--
    <button class="btn mt-2" @click="openOptionsPage">
      Open Options
    </button> -->

    <form action="">
      <div class="mt-6">
        <label for="apiKeys" class="font-semibold text-left mb-2 block">OpenAI API Key</label>
        <div class="relative flex items-center">
          <input
            id="apiKeys"
            v-model="apiKey"
            :type="show ? 'text' : 'password'"
            autofocus
            class="
              pr-7
              block
              w-full
              rounded-md
              bg-gray-100
              border-transparent
              focus:border-gray-500 focus:bg-white focus:ring-0
            "
          >

          <div class="absolute cursor-pointer right-[12px]" @click="toggle(!show)">
            <gridicons-visible v-if="show" class="mx-auto" />
            <gridicons-not-visible v-else class="mx-auto" />
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
