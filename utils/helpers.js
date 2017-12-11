import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatDeckResults} from './_decks'

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function getDeck (id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => {
      const data = JSON.parse(decks)
      return data[id]
    })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY, 
    JSON.stringify({ [title]: { questions: [] } })
  )
}

export function addCardToDeck (title, card) {
  return AsyncStorage.setItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({ [title]: card })
  )
}

