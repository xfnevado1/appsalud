import { createStore } from 'redux'

const initialState = {
  infoUser: { username:"", nombre:"", menuAdmin:[]},
  tokenID: { token: "" }
};

const saveToLocalStorageState =(state)=>{
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState);

  } catch (error) {
    console.log("error en state:",error)
  }
};

const loadToLocalStorageState =()=>{
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) 
      return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.log("error en state:",error)
    return undefined
  }
};

const persistedState = loadToLocalStorageState();
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return Object.assign({}, state, { tokenID: { token: action.payload.token } })

    case 'UPDATE_INFO_USER':
      return Object.assign({}, state, {
        infoUser: { username:"", nombre:"", menuAdmin: action.payload.menuAdmin, menuUser: action.payload.menuUser }
      })
        
    default:
      break;
  }
  return state;
}

const store = createStore(reducer, persistedState)
store.subscribe(()=> saveToLocalStorageState(store.getState()))
export default store