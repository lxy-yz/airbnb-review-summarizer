import pkg from '../../package.json'
import { useStorageLocal } from '~/composables/useStorageLocal'

const PREFIX = pkg.name

export const apiKey = useStorageLocal(`${PREFIX}_openai_apikey`, '')
export const keywords = useStorageLocal<Record<string, boolean>>(`${PREFIX}_keywords`, {
  'Sleep': false,
  'Sauna': false,
  'Safe Neighborhood': false,
  'Books': false,
})
