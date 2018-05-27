/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Nav from './global-widgets/nav';
import SwipeCards from 'react-native-swipe-cards';
import Iconz from 'react-native-vector-icons/Ionicons';
import HttpClient from '../service/http-client';

export default class Home extends Component {
  card = null;
  intervalId: null;

  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  fetchNewAds() {
    return HttpClient.fetchCards().then(
      allCards => {
        const cards = this.state.cards;
        if (!cards.length) {
          this.setState({
            cards: allCards
          });
        }
        allCards.forEach(newCard => {
          const existingCard = cards.find(
            card => card.id === newCard.id);
          if (!existingCard) {
            cards.push(newCard);
          }
        });
        cards.forEach((card, i) => {
          const existingCard = allCards.find(
            newCard => newCard.id === card.id);
          if (!existingCard) {
            cards.splice(i, i + 1);
          }
        });
        if (!cards.length) {
          this.setState({
            cards: cards
          });
        }
      });
  }

  componentDidMount() {
    HttpClient.fetchCards().then(
      cards => {
        this.setState({ cards: cards });
        this.intervalId = setInterval(() => this.fetchNewAds(), 500);
      });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getCardView(card) {
    this.card = card;
    return (
      <View style={styles.card}>
        <Image source={{ uri: card.image }} resizeMode="contain" style={{ width: 350, height: 350 }}/>
        <View style={{
          width: 350,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'row', margin: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: '300', color: '#444' }}>{card.name}, </Text>
            <Text style={{ fontSize: 21, fontWeight: '200', color: '#444' }}>{card.age}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              padding: 13,
              borderLeftWidth: 1,
              borderColor: '#e3e3e3',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
            </View>
          </View>
        </View>
      </View>
    );
  }

  handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }

  handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }

  noMore() {
    this.card = null;
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    );
  }

  review() {
    if (HttpClient.isSignedIn()) {
      if (this.card === null) {
        Alert.alert(
          'No Selected Girl',
          'Please, select girl you like',
          [
            { text: 'Ok', onPress: () => console.log('Select girl ok') },
          ],
          { cancelable: true });
      } else {
        console.log(this.refs['swiper']);
        this.props.navigator.push({
          id: 'review',
          userData: {
            card: this.card
          }
        });
      }
    } else {
      Alert.alert(
        'Sign In',
        'Please, sign in to view details',
        [
          { text: 'Cancel', onPress: () => console.log('Ask me later pressed') },
          { text: 'Sign In', onPress: () => this.props.navigator.push({ id: 'sign-in' }) },
        ],
        { cancelable: true });
    }
  }

  nope() {
    console.log(this.refs['swiper']);
    this.refs['swiper']._goToNextCard();
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav toProfile={() => this.props.navigator.push({ id: 'profile' })}/>
        <SwipeCards
          ref={'swiper'}
          loop={true}
          cards={this.state.cards}
          renderCard={(cardData) => this.getCardView(cardData)}
          renderNoMoreCards={() => this.noMore()}
          handleYup={(card) => this.handleYup(card)}
          handleNope={(card) => this.handleNope(card)}/>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.buttons} onPress={() => this.review()}>
            <Iconz name='ios-eye' size={36} color="#888" style={{ marginTop: 5 }}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
  },
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
