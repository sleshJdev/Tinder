/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconz from 'react-native-vector-icons/Ionicons';
import HttpClient from '../service/http-client';
import Auth from '../service/auth';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: []
    }
  }

  componentDidMount() {
    HttpClient.fetchGirls().then(girls => {
      this.setState({ cards: girls })
    })
  }

  Card(x) {
    return (
      <View style={styles.card}>
        <Image source={x.image} resizeMode="contain" style={{ height: 350 }}/>
        <View style={{
          width: 350,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'row', margin: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: '300', color: '#444' }}>{x.first_name}, </Text>
            <Text style={{ fontSize: 21, fontWeight: '200', color: '#444' }}>{x.age}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              padding: 13,
              borderLeftWidth: 1,
              borderColor: '#e3e3e3',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Icon name='people-outline' size={20} color="#777"/>
              <Text style={{ fontSize: 16, fontWeight: '200', color: '#555' }}>{x.friends}</Text>
            </View>
            <View style={{
              padding: 13,
              borderLeftWidth: 1,
              borderColor: '#e3e3e3',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Icon name='import-contacts' size={20} color="#777"/>
              <Text style={{ fontSize: 16, fontWeight: '200', color: '#555' }}>{x.interests}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  handleYup(card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope(card) {
    console.log(`Nope for ${card.text}`)
  }

  noMore() {
    return (
      <View style={styles.card}>
        <Text>No More Cards</Text>
      </View>
    )
  }

  yup() {
    if (Auth.isSignedIn()) {
      console.log(this.refs['swiper'])
      this.refs['swiper']._goToNextCard()
    } else {
      this.props.navigator.replace({ id: 'sign-in' })
    }
  }

  nope() {
    console.log(this.refs['swiper'])
    this.refs['swiper']._goToNextCard()
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav toProfile={() => this.props.navigator.replace({ id: 'profile' })}/>
        <SwipeCards
          ref={'swiper'}
          cards={this.state.cards}
          renderCard={(cardData) => this.Card(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={(card) => this.handleYup(card)}
          handleNope={(card) => this.handleNope(card)}/>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.buttons} onPress={() => this.nope()}>
            <Iconz name='ios-close' size={45} color="#888" style={{}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSmall}>
            <Iconz name='ios-information' size={25} color="#888" style={{}}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => this.yup()}>
            <Iconz name='ios-heart-outline' size={36} color="#888" style={{ marginTop: 5 }}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  buttons: {
    width: 80,
    height: 80,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  buttonSmall: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  card: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e3e3e3',
  }

});
