/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Nav from './global-widgets/nav'

const { width } = Dimensions.get('window');

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      friends: 1098
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Nav type="profile" onPress={() => this.props.navigator.replace({ id: 'home' })}/>
        <ScrollView style={styles.container}>
          <Image source={require('../images/profile.jpg')} resizeMode="stretch" style={{ height: 350, width: width }}/>
          <View style={[styles.row, { marginTop: 15 }]}>
            <Text style={{ fontSize: 19, fontWeight: '400' }}>Samuel, </Text><Text
            style={{ fontSize: 21, fontWeight: '300', marginBottom: -2 }}>23</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#444', fontSize: 15 }}>Unappers Creative</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#777', fontSize: 11 }}>less than a mile away</Text>
          </View>
          <View style={styles.description}>
            <Text style={{ color: '#555' }}>We hook up, you do my laundry, I promise to call you but never
              really.</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f7f7f7',
  },
  row: {
    flexDirection: 'row',
    margin: 15,
    marginBottom: 0,
    marginTop: 5,
    alignItems: 'flex-end'
  },
  description: {
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    marginTop: 10,
    marginBottom: 10
  }
});
