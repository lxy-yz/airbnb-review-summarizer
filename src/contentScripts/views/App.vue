<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'
import { makePrompt } from '../utils'
import { apiKey, keywords } from '~/logic/storage'

const LISTING_REVIEWS_REGEX = /airbnb\.com\/rooms\/\d+/i
const defaultEnabled = LISTING_REVIEWS_REGEX.test(window.location.href)
const [enabled, _] = useToggle(defaultEnabled)
// const OPENAI_API_KEY = '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'

const summary = ref('')
const errorMessage = ref('')
async function handleSummarizeReviews() {
  errorMessage.value = ''
  try {
    await summarizeReviews()
  }
  catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong. Check if the API key is correct.'
  }
}
async function summarizeReviews() {
  if (!apiKey.value)
    throw new Error('OpenAI API key is not set')

  const prompt = await makePrompt()
  if (!prompt)
    throw new Error('No reviews found')

  summary.value = ''
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.value}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that accurately answers queries using Allen\'s essays. Use the text provided to form your answer, but avoid copying word-for-word from the essays. Try to use your own words when possible. Keep your answer under 5 sentences. Be accurate, helpful, concise, and clear.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 150,
      temperature: 0.0,
      stream: true,
    }),
  })

  if (!res.ok)
    throw new Error('OpenAI API returned an error')

  const reader = res.body?.getReader()
  const decoder = new TextDecoder('utf-8')
  while (true) {
    const { done, value } = await reader?.read() || {}
    if (done)
      break

    const chunk = decoder.decode(value)
    const parsedLines = chunk
      .replace('data: [DONE]', '')
      .trim()
      .split('data: ')
      .filter(Boolean)

    for (const parsedLine of parsedLines) {
      const { choices } = JSON.parse(parsedLine)
      const { delta } = choices[0]
      const { content } = delta
      if (content)
        summary.value += content
    }
  }
}

const customKeyword = ref('')
function handleEnterKey() {
  const keyword = customKeyword.value.trim()
  if (!keyword)
    return
  keywords.value[keyword] = true
}
</script>

<template>
  <div class="z-100 font-sans mb-8">
    <div
      class="bg-white text-gray-800 rounded-lg shadow h-min"
      p="x-4 y-2"
      m="y-auto r-2"
    >
      <div
        class="pt-4 w-full min-h-[256px]"
        :show="enabled"
      >
        <div class="flex gap-4">
          <div class="max-w-[368px] w-1/2">
            <div class="flex flex-col">
              <div class="">
                <span class="text-sm font-semibold">What do you care about?</span>
                <div class="mt-4 flex flex-wrap gap-3">
                  <button
                    v-for="([keyword, keywordSelected]) in Object.entries(keywords)"
                    :key="keyword"
                    class="cursor-pointer font-semibold py-2 px-4 border rounded-full"
                    :class="keywordSelected ? 'bg-pink-500 text-white border-transparent' : 'bg-transparent text-pink-700 border-pink-500'"
                    @click="keywords[keyword] = !keywordSelected"
                  >
                    {{ keyword }}
                  </button>
                </div>
              </div>
              <div class="mt-4 flex">
                <input
                  v-model="customKeyword"
                  type="text"
                  class="
                    px-3 py-2
                    mt-1
                    block
                    w-full
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                  placeholder="Custom keyword e.g. 5 ⭐ reviews"
                  @keyup.enter="handleEnterKey()"
                >

                <div class="relative flex items-center">
                  <uil-enter class="absolute right-[10px] block m-auto text-gray-500 font-light" />
                </div>
              </div>
              <div class="mt-10">
                <button
                  class="w-full bg-pink-500 text-white font-bold py-2 px-4 border-b-4 rounded
                  border-pink-700 hover:border-pink-500 hover:bg-pink-400 hover:cursor-pointer"
                  @click="handleSummarizeReviews()"
                >
                  Summarize Reviews
                </button>
              </div>
            </div>
          </div>
          <div class="flex-1 flex flex-col">
            <div class="text-sm font-semibold">
              Summary
            </div>
            <div class="mt-4 flex-1 bg-gray-100 text-s px-3 py-2">
              {{ errorMessage || summary }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button> -->
  </div>
</template>
