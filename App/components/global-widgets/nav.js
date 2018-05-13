/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Iconz from 'react-native-vector-icons/Ionicons';

export default class Nav extends Component {

  home() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.toProfile}>
          <Iconz name="ios-person" color="#888" size={25} style={{ margin: 10 }}/>
        </TouchableOpacity>
        <Image source={require('../../images/logo.png')} resizeMode="contain"
               style={{ width: 100, height: 30 }}/>
      </View>
    );
  }

  profile() {
    return (
      <View style={styles.container}>
        <View style={{ width: 25, height: 25, margin: 10 }}/>
        <Image source={require('../../images/logo.png')} resizeMode="contain"
               style={{ width: 100, height: 30 }}/>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image source={require('../../images/tinder.png')} style={{ width: 25, height: 25, margin: 10 }}/>
        </TouchableOpacity>
      </View>
    );
  }

  message() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image source={require('../../images/tinder.png')} style={{ width: 25, height: 25, margin: 10 }}/>
        </TouchableOpacity>
        <Image source={require('../../images/logo.png')} resizeMode="contain"
               style={{ width: 100, height: 30 }}/>
        <View style={{ width: 25, height: 25, margin: 10 }}/>
      </View>
    );
  }

  render() {
    if (this.props.type === 'profile') {
      return this.profile()
    }
    return this.home()
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
