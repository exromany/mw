import { createStore, applyMiddleware, compose } from 'redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import debounce from 'redux-storage-decorator-debounce';
import filter from 'redux-storage-decorator-filter';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import reducers, { blackListReducers, whiteListReducers } from '../reducers';
import { blackListActions, whiteListActions } from '../actions';

let engine = createEngine('my-save-key');
engine = filter(engine, whiteListReducers, blackListReducers);
engine = debounce(engine, 1500);

const store = storage.createMiddleware(engine, blackListActions, whiteListActions);
const reducer = storage.reducer(reducers);

const finalCreateStore = compose(
  applyMiddleware(thunk, store),
  devTools(),
)(createStore);

export default function configureStore(initState) {
  const store = finalCreateStore(reducer, initState);
  const load = storage.createLoader(engine);
  load(store);
  return store;
}
