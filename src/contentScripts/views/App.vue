<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'
import { pollDOMUntilReady } from '../utils'

const [show, toggle] = useToggle(false)

function getAllTextFromNode(node: Node | Element | null) {
  if (!node)
    return ''
  let text = ''
  if (node.nodeType === Node.TEXT_NODE)
    text += node.textContent
  for (let i = 0; i < node.childNodes.length; i++)
    text += getAllTextFromNode(node.childNodes[i])
  return text
}

const LISTING_REVIEWS_REGEX = /airbnb\.com\/rooms\/\d+/i
const defaultEnabled = LISTING_REVIEWS_REGEX.test(window.location.href)
const [enabled, setEnabled] = useToggle(defaultEnabled)

const [rating, setRating] = useToggle(false)
const [sleep, setSleep] = useToggle(false)
const [neighborhood, setNeighborhood] = useToggle(false)

const summary = ref('')
const OPENAI_API_KEY = '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'
const makePrompt = (placeholder: string) => {
  return `I am an avid traveler who likes to stay in Airbnb.  Help me to summarize the airbnb listing reviews below make informed decision about whether this listing is a fit for me or not. A few things that I care about
${rating ? '- Five star reviews' : ''}
${sleep ? '- Good sleep environment' : ''}
${neighborhood ? '- Safe neighborhood' : ''}

Listing reviews below: 
${placeholder}`
}

async function getAllReviews() {
  const reviewsNode = await pollDOMUntilReady('[data-testid="pdp-reviews-modal-scrollable-panel"]', 10000)
  const allText = getAllTextFromNode(reviewsNode)
  return makePrompt(allText)
}

async function summarizeReviews() {
  const prompt = await getAllReviews()

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
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
</script>

<!-- transition="opacity duration-300" -->
<!-- :class="show ? 'opacity-100' : 'opacity-0'" -->
<template>
  <div class="m-5 z-100 font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-lg shadow h-min"
      p="x-4 y-2"
      m="y-auto r-2"
    >
      <h1 class="text-lg">
        Summary
      </h1>
      <SharedSubtitle />

      <div
        class="w-full h-[256px] px-4 py-2 bg-gray-100 rounded shadow-inner"
        :show="enabled"
      >
        <div class="flex gap-4">
          <div class="w-1/2">
            <div class="flex flex-col">
              <div class="">
                <span class="text-sm font-semibold">What do you care about?</span>
                <div class="mt-2 flex flex-wrap gap-3">
                  <button
                    class="font-semibold py-2 px-4 border rounded"
                    :class="rating ? 'bg-blue-500 text-white border-transparent' : 'bg-transparent text-blue-700 border-blue-500'"
                    @click="setRating(!rating)"
                  >
                    Five star review
                  </button>
                  <button
                    class="font-semibold py-2 px-4 border rounded"
                    :class="sleep ? 'bg-blue-500 text-white border-transparent' : 'bg-transparent text-blue-700 border-blue-500'"
                    @click="setSleep(!sleep)"
                  >
                    Sleep
                  </button>
                  <button
                    class="font-semibold py-2 px-4 border rounded"
                    :class="neighborhood ? 'bg-blue-500 text-white border-transparent' : 'bg-transparent text-blue-700 border-blue-500'"
                    @click="setNeighborhood(!neighborhood)"
                  >
                    Safe Neighborhood
                  </button>
                </div>
              </div>
              <div class="mt-4">
                <label for="custom_prompt" class="text-sm font-semibold">Write your custom prompt (optional)</label>
                <textarea id="custom_prompt" class="w-full max-h-16 mt-2" name="custom_prompt" cols="20" rows="10" />
              </div>
              <div class="mt-4">
                <button
                  class="w-full bg-blue-500 hover:bg-blue-400 hover:cursor-pointer text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                  @click="summarizeReviews()"
                >
                  Summarize Reviews
                </button>
              </div>
            </div>
          </div>
          <p class="w-1/2 bg-white text-sm">
            {{ summary }}
          </p>
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
