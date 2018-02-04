# Mobile Flashcards Project
Requirements were to build a mobile application (Android or iOS - or both) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

# Requirements

## Rubric
https://review.udacity.com/#!/rubrics/1021/view

* Decks list view shows all decks created with title and card count
* Add Deck menu available
* Add Deck menu allows you to add a new deck
* After adding a deck you will be taken to the Deck view which shows a list of cards as well as options to add a card and run a quiz
* Add Card view allows you to enter question and answer and will add the card to the deck, returns to Deck view after
* Quiz will run a quiz for the user following the requirements 
  * goes through each card
  * button to view answer
  * card flip has animation
  * user can indicate correct vs incorrect
  * how many cards remaining
  * at the end the score is shown in % and buttons to restart or return to deck
* A notification is scheduled for once per day which is reset when the user finishes one quiz

## Platforms Tested
This app was tested against iOS and Android simulators as well as on an iPhone 6s device via Expo.

# Install / Run

Simple steps:
```
yarn install
yarn start
```

Then select the device/emualtion you wish to run Expo with.


Since this project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app) you can view their documentation for full details/options available.
