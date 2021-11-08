import { createStore, applyMiddleware  } from "redux";
import thunk from 'redux-thunk'
import reducer from "./reducer";
import {loadState, saveState} from '../localStorage'
const persistedState = loadState();
const store = createStore(reducer, persistedState, applyMiddleware(thunk));
store.subscribe(() => {
    saveState({
        listPannier:store.getState().listPannier,
        pannier:store.getState().pannier,
        totalPrice:store.getState().totalPrice,
        offerPrice:store.getState().offerPrice,
        countBooks:store.getState().countBooks,
        books:store.getState().books,
    })
  })


export default store;