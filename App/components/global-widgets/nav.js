/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default class Nav extends Component {

  home() {
    return (
      <View style={styles.container}>
        <Image source={require('../../images/logo.png')} resizeMode="contain"
               style={{ width: 100, height: 30 }}/>
      </View>
    );
  }

  review() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.toHome}>
          <Image source={require('../../images/tinder.png')}
                 resizeMode="contain"
                 style={{ width: 100, height: 30 }}/>
        </TouchableOpacity>
        <Image source={require('../../images/logo.png')} resizeMode="contain"
               style={{ width: 100, height: 30, margin: 10 }}/>
      </View>
    );
  }

  render() {
    if (this.props.type === 'review') {
      return this.review();
    }
    return this.home();
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
  },
});
