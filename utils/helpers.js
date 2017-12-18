import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatDeckResults} from './_decks'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashCards:notifications'


export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatDeckResults)
}

export function getDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => JSON.parse(decks)[title])
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY, 
    JSON.stringify({ [title]: { title, questions: [] } })
  )
}

export function addCardToDeck (deck, card) {
  const { title, questions } = deck
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title,
        'questions': [
          ...questions,
          card
        ]
      }
    })
  )
}

// NOTIFICATIONS

export function getDailyReminderValue() {
  return {
    today: "Don't forget to check your flashcards today!"
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification() {
  return {
    title: 'Study Up with FlashCards...',
    body: "don't forget to study your flashcards today...",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then( data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then( ({status}) =>  {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              // 8:30pm
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),{
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}