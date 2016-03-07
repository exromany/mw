import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import reducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
)(createStore);

export default function configureStore(initState) {
  return finalCreateStore(reducer, initState);
}
