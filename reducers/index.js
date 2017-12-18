import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'


function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      const {decks} = action
      return {
        ...state,
        ...decks
      }
    case ADD_DECK:
      const {deck} = action
      return {
        ...state,
        [deck.title]: {
          title: deck.title,
          questions: deck.questions
        }
      }
    case ADD_CARD:
      const {title, card} = action
      return {
        ...state,
        [title]: {
          title,
          'questions': [
            ...state[title].questions,
            card
          ]
        }
      }
    default:
      return state
  }
}

export default decks