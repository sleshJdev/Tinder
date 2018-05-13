/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Navigator, View } from 'react-native';

import Home from './home';
import Profile from './profile';
import SignIn from "./sign-in";


export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  renderScene(route, navigator) {
    const { state, actions } = this.props;
    const routeId = route.id;

    if (routeId === 'home') {
      return (
        <Home
          {...this.props}
          userData={route.userData}
          navigator={navigator}/>
      );
    }
    if (routeId === 'profile') {
      return (
        <Profile
          {...this.props}
          userData={route.userData}
          navigator={navigator}/>
      );
    }

    if (routeId === 'sign-in') {
      return (
        <SignIn
          {...this.props}
          userData={route.userData}
          navigator={navigator}/>
      );
    }
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navigator
          style={{ flex: 1 }}
          ref={'NAV'}
          initialRoute={{ id: 'home', name: 'home' }}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}/>
      </View>
    )
  }
}

