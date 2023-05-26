import { useStorageLocal } from '~/composables/useStorageLocal'

export const apiKey = useStorageLocal('openai_apikey', '')
