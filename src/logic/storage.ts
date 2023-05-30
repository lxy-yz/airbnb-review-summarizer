import pkg from '../../package.json'
import { useStorageLocal } from '~/composables/useStorageLocal'

const PREFIX = pkg.name

export const apiKey = useStorageLocal(`${PREFIX}_openai_apikey`, '')
export const keywords = useStorageLocal<Record<string, boolean>>(`${PREFIX}_keywords`, {
  'Noise': false,
  'Sleep': false,
  'Safety': false,
  'Solo Traveler': false,
  'Couple Travelers': false,
  'Sauna': false,
  'Books': false,
})
