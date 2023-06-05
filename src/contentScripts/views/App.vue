<script setup lang="ts">
import 'uno.css'
import { makePrompt } from '../utils'
import { apiKey, expanded, keywords } from '~/logic/storage'

// const LISTING_REVIEWS_REGEX = /airbnb\.com\/rooms\/\d+/i
// const defaultEnabled = LISTING_REVIEWS_REGEX.test(window.location.href)
// const [enabled, _] = useToggle(defaultEnabled)
const mode = ref('keywords')
const keywordsBtn = ref<HTMLButtonElement | null>(null)
const promptBtn = ref<HTMLButtonElement | null>(null)
onMounted(() => {
  keywordsBtn.value?.focus()
})

const summary = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const customPrompt = ref('')
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

  const prompt = await makePrompt(mode.value === 'prompt' ? customPrompt.value.trim() : undefined)
  if (!prompt)
    throw new Error('No reviews found')
  // console.log('[prompt]', prompt)

  summary.value = ''
  isLoading.value = true
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
          // FIX: use GPT4 (32000 token limit) to workaround the 4000 token (4 char) limit
          content: prompt.slice(0, 15000),
        },
      ],
      max_tokens: 150,
      temperature: 0.0,
      stream: true,
    }),
  }).finally(() => {
    isLoading.value = false
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
</script>

<template>
  <div class="z-100 font-sans mb-4">
    <div
      class="bg-white text-gray-800 rounded-lg shadow"
      p="x-4 y-4"
      m="y-auto r-2"
    >
      <div class="flex justify-between items-center px-3">
        <div class="font-bold">
          Summary
        </div>
        <div class="cursor-pointer" @click="expanded = !expanded">
          <ph-caret-down v-if="!expanded" />
          <ph-caret-up v-else class="" />
        </div>
      </div>
      <div
        v-show="expanded"
        class="mt-4 w-full h-[256px]"
      >
        <div class="flex gap-4 h-full">
          <div class="w-1/2 h-full overflow-y-auto">
            <div class="flex flex-col justify-between h-full">
              <div class="inline-flex mb-4" role="group">
                <button
                  ref="keywordsBtn"
                  type="button"
                  class="rounded-l-lg border border-solid border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                  @click="mode = 'keywords'"
                >
                  Keywords
                </button>
                <button
                  ref="promptBtn"
                  type="button"
                  class="rounded-r-md border border-l-none border-solid border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                  @click="mode = 'prompt'"
                >
                  Prompt
                </button>
              </div>
              <div v-show="mode === 'prompt'">
                <textarea
                  v-model="customPrompt"
                  required
                  placeholder="Your custom prompt (e.g. summarize the pros and cons of this listing from reviews)"
                  class="
                    text-sm
                    w-full!
                    min-h-[150px]!
                    p-2
                    block
                    box-border
                    rounded-md
                    bg-gray-100
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  "
                  rows="6"
                />
              </div>
              <div v-show="mode === 'keywords'">
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="keyword in keywords"
                    :key="keyword.id"
                    class="cursor-pointer font-semibold px-3 py-2 border rounded-full"
                    :class="keyword.selected ? 'bg-neutral-700 text-white border-transparent' : 'bg-transparent text-neutral-700 border-neutral-500'"
                    @click="keyword.selected = !keyword.selected"
                  >
                    {{ keyword.keyword }}
                  </button>
                </div>
              </div>
              <div class="mt-4">
                <button
                  class="relative w-full bg-pink-500 text-white font-bold py-2 px-4 border-b-4 rounded
                  border-pink-700 hover:border-pink-500 hover:bg-pink-400 hover:cursor-pointer"
                  :disabled="isLoading"
                  @click="handleSummarizeReviews()"
                >
                  <gg-spinner v-show="isLoading" class="animate-spin absolute left-3" />
                  Summarize Reviews
                </button>
              </div>
            </div>
          </div>
          <div class="relative flex-1 flex flex-col bg-gray-100 overflow-y-auto">
            <div
              :class="summary ? 'hidden!' : 'block'"
              class="absolute w-full h-full flex justify-center items-center text-gray-500 font-semibold"
            >
              Summary
            </div>
            <div class="mt-4 flex-1 text-s px-3 py-2">
              {{ errorMessage || summary }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
