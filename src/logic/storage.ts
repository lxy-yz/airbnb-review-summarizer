import { useStorageLocal } from '~/composables/useStorageLocal'

const PREFIX = __NAME__

export const apiKey = useStorageLocal(`${PREFIX}openai_apikey`, '')
export const keywords = useStorageLocal<Record<string, boolean>>(`${PREFIX}__NAME__keywords`, {
  'Sleep': false,
  'Sauna': false,
  'Safe Neighborhood': false,
  'Books': false,
})
