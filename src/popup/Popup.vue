<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { apiKey, generateUUID, keywords } from '~/logic/storage'

const [show, toggle] = useToggle(false)

// function openOptionsPage() {
//   browser.runtime.openOptionsPage()
// }

const customKeyword = ref('')
function handleEnterKey() {
  const keyword = customKeyword.value.trim()
  if (!keyword)
    return
  keywords.value = [
    ...keywords.value,
    {
      id: generateUUID(),
      keyword,
      selected: false,
    },
  ]
  customKeyword.value = ''
}

function handleChange(event: Event, id: string) {
  const newKeyword = (event.target as HTMLInputElement).value.trim()
  const keywordExists = keywords.value.find(k => k.keyword === newKeyword)
  if (!newKeyword || keywordExists)
    return
  const keyword = keywords.value.find(k => k.id === id)
  if (keyword)
    keyword.keyword = newKeyword
}
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
        <label for="apiKeys" class="font-semibold block text-left">OpenAI API Key</label>
        <div class="mt-2 relative flex items-center">
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

          <div class="absolute cursor-pointer right-[10px]" @click="toggle(!show)">
            <gridicons-visible v-if="show" class="mx-auto" />
            <gridicons-not-visible v-else class="mx-auto" />
          </div>
        </div>
      </div>
      <div class="mt-4">
        <label for="keywords" class="font-semibold block text-left">Keywords</label>
        <div class="mt-2 flex flex-col gap-3">
          <div
            v-for="keyword in keywords"
            :key="keyword.id"
            class="flex"
          >
            <input
              :value="keyword.keyword"
              type="text"
              class="
              text-sm
              px-3
              py-2
              block
              w-full
              rounded-md
              bg-gray-100
              border-transparent
              focus:border-gray-500 focus:bg-white focus:ring-0
            "
              @change="handleChange($event, keyword.id)"
            >
            <div
              v-show="keywords.length > 1"
              class="relative flex items-center"
            >
              <jam-close
                class="absolute right-[10px] cursor-pointer"
                @click=" keywords = keywords.filter(k => k.id !== keyword.id)"
              />
            </div>
          </div>
        </div>
        <div
          v-show="keywords.length < 5"
          class="mt-3 flex"
        >
          <input
            v-model="customKeyword"
            type="text"
            class="
              text-sm
              pr-[10px]
              py-2
              block
              w-full
              rounded-md
              bg-gray-100
              border-transparent
              focus:border-gray-500 focus:bg-white focus:ring-0
            "
            placeholder="Add keyword (e.g. ⭐ reviews)"
            @keyup.enter="handleEnterKey()"
          >
          <div class="relative flex items-center">
            <uil-enter class="absolute right-[10px] block m-auto text-gray-500 font-light" />
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
