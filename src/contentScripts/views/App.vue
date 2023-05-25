<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'

const [show, toggle] = useToggle(false)

const LISTING_REVIEWS_REGEX = /airbnb\.com\/rooms\/\d+/i
const defaultEnabled = LISTING_REVIEWS_REGEX.test(window.location.href)
const [enabled, setEnabled] = useToggle(true)

const summary = ref('')
const OPENAI_API_KEY = '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'
const makePrompt = (x: string) => `
I am an avid traveler who likes to stay in Airbnb.  Help me to summarize the airbnb listing reviews below make informed decision about whether this listing is a fit for me or not. A few things that I care about
- Five star reviews
- Good sleep environment
- Safe neighborhood
- Convenient location

Listing reviews below: 
${x}
`
async function summarizeReviews(reviews: string) {
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
          content: makePrompt(reviews),
        },
      ],
      max_tokens: 150,
      temperature: 0.0,
      // stream: true
    }),
  })
  if (res.ok)
    summary.value = (await res.json()).choices[0].message.content
}
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div
      class="bg-white text-gray-800 rounded-lg shadow w-max h-min"
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg">
        Vitesse WebExt
      </h1>
      <SharedSubtitle />

      <div
        :show="enabled"
      >
        cool shit
      </div>
      <button
        @click="summarizeReviews('this place is amazing, safe, clean, good located')"
      >
        click me
      </button>
      <p>
        {{ summary }}
      </p>
    </div>
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
