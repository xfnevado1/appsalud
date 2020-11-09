import { createStore } from 'redux'

const initialState = {
  infoUser: {token:"", username:"", nombre:""},
  signUpModal: {
    open: false
  }
}

const reducer = (state = initialState, action) => {
  if (action.type === 'UPDATE_TOKEN') {
    return Object.assign({}, state, {
      infoUser: { token: action.payload.token, username:"", nombre:"" }
    })
  }

  return state
}

const store = createStore(reducer)
export default store