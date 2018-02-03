import { AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4'

const CARDS_STORAGE_KEY = '@flashCardsMobileApp'


/*
*return an object of all of the decks along with their titles, questions, and answers. 
*/
export function getAllDecks(){
        return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(decks=>(decks ? JSON.parse(decks): {}))
        .catch(function(error) {
            console.log(error);
          })
}

/*
*take in a single id argument and return the deck associated with that id.
*/
export function getDeckById(id){
    return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(
        (data)=>{
            let decks = JSON.parse(data)
            if(decks[id]){
                let deck = decks[id]
                deck.id = id
                console.log(deck)
                return deck
            }
            else{
                return {}
            }
        }
    )
    .catch(function(error) {
        console.log(error);
      })
}

/*
* take in a single title argument and add it to the decks.
*/
export function addDeckByTitle(title){
    const uuid = uuidv4()
    return AsyncStorage.mergeItem(CARDS_STORAGE_KEY, JSON.stringify({[uuid]: { title, questions: [] }}))
    .then(()=>(uuid))
    .catch(function(error) {
        console.log(error);
        })
}

/*
* take in two arguments, title and card, and will add the card to the list of questions for the 
*/
export function addCardToDeck(title,card){
    return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(result => {
        const updateData = JSON.parse(result);
        let questions = udpateData[title].questions;
        questions.push(card);
        AsyncStorage.mergeItem(title, JSON.stringify({
        [title]: questions
        }))
    }).catch(function(error) {
        console.log(error);
        })
}

/*
* take in a single title argument and add it to the decks.
*/
export function deleteDeckById(id){
    return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(result => {
        let updateData = JSON.parse(result)
        console.log(id)
        delete updateData[id]
        AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(updateData))
    }).catch(function(error) {
        console.log(error);
        })
}