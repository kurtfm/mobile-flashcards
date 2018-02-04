import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { CARDS_STORAGE_KEY } from './api'

const NOTIFICATION_KEY = `${CARDS_STORAGE_KEY}:notifications`

export function doesTitleExistInDecks(decks, title) {
    let exists = false
    Object.keys(decks).every((key) => {
            if(decks[key].title === title){
                exists = true
            }
        })
    return exists
}

export function doesQuestionExistInQuestions(questions, question) {
    var results = questions.filter((entry) =>{ return entry.question === question; })
    return results.length > 0
}

export function getDailyReminderValue () {
    return {
      today: `👋 don't forget to studay today! 📚`
    }
  }

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
    return {
        title: `Don't Forget To Study Today!`,
        body: `👋 don't forget to studay today! 📚`,
        ios: {
        sound: true,
        },
        android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
        }
    }
}

export function setLocalNotification () {
AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        console.log(`storage data for notications: ${data}`)
    if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
        .then(({ status }) => {
            console.log(status)
            if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            //for debugging/testing
            let date = new Date()
            let tomorrow = new Date(date.getTime() + 5*60000)
            //let tomorrow = new Date()
            //tomorrow.setDate(tomorrow.getDate() + 1)
            //tomorrow.setHours(20)
            //tomorrow.setMinutes(0)
            Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                time: tomorrow,
                repeat: 'minute',
                }
            )

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
        })
    }
    })
}