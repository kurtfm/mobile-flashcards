import { combineReducers } from 'redux';
import { GET_DECKS, GET_DECK} from '../actions'

function decks(state = {}, action){
  switch (action.type) {
    case GET_DECKS:
      return action.decks
    default:
      return state;
  }
}
function deck(state = {}, action){
  switch (action.type) {
    case GET_DECK:
      return action.deck ? action.deck : {}
    default:
      return state;
  }
}

export default combineReducers({
  decks,
  deck
});