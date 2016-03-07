import React, { Component } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configure-store';
import App from './app';

export default class Root extends Component {
  render () {
    const store = configureStore();
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
