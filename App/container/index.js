import React, { Component } from 'react';
import { View } from 'react-native';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import * as reducers from '../reducers';
import Components from '../components/index';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);


export default class Index extends Component {
  render() {
    return (
      <View
        style={{ flex: 1 }}>
        <Provider store={store}>
          <Components/>
        </Provider>
      </View>);
  }
}
