import { applyMiddleWare, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';

export function configureStore(initialState) {
    const middleWare = [thunk];
    const store = createStore(rootReducer, initialState);
    return  store;
}