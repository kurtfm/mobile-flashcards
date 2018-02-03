import { getAllDecks, getDeckById, addDeckByTitle, deleteDeckById} from '../utils/api'

export const GET_DECKS = 'GET_DECKS';
export const GET_DECK = 'GET_DECK';

export function getDecks() {
    return (dispatch) => {
      getAllDecks().then((decks) => {
          dispatch({ type: GET_DECKS, decks})}
        )
    }
}

export function getDeck(id) {
    return (dispatch) => {
      getDeckById(id).then((deck) => {
          dispatch({ type: GET_DECK, deck})
      })
    }
}

export function deleteDeck(id){
  return (dispatch) => {
    deleteDeckById(id)
    .then(getAllDecks)
    .then((decks) => {
      dispatch({ type: GET_DECKS, decks})}
    )
    .then(()=>{
      const deck = {}
      dispatch({ type: GET_DECK, deck })
    }
    )
  }
}

export function addDeck(title){
  return (dispatch) => {
    addDeckByTitle(title)
    .then(getAllDecks)
    .then((decks) => {
      dispatch({ type: GET_DECKS, decks})}
    )
  }
}