import pkg from '../../package.json'
import { useStorageLocal } from '~/composables/useStorageLocal'

const PREFIX = pkg.name

export const expanded = useStorageLocal(`${PREFIX}_expand_ui`, false)
export const apiKey = useStorageLocal(`${PREFIX}_openai_apikey`, '')
export const keywords = useStorageLocal<Keyword[]>(`${PREFIX}_keywords`, [
  {
    id: generateUUID(),
    keyword: 'Sleep environment',
    selected: false,
  },
  {
    id: generateUUID(),
    keyword: 'Dedicated workspace',
    selected: false,
  }, {
    id: generateUUID(),
    keyword: 'Noise',
    selected: false,
  }, {
    id: generateUUID(),
    keyword: 'Solo traveler',
    selected: false,
  }, {
    id: generateUUID(),
    keyword: 'Entertainment',
    selected: false,
  },
])

export interface Keyword {
  id: string
  keyword: string
  selected: boolean
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
