import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


export default class Review extends Component {
  card = null;

  constructor(props) {
    super(props);
    this.card = this.props.userData.card;
  }

  render() {
    return (
      <View style={styles.card}>
        <Image source={{ uri: this.card.image }} resizeMode="contain" style={{ width: 150, height: 150 }}/>
        <View style={{
          width: 350,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <View style={{ flexDirection: 'row', margin: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: '300', color: '#444' }}>{this.card.first_name}, </Text>
            <Text style={{ fontSize: 21, fontWeight: '200', color: '#444' }}>{this.card.age}</Text>
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

}

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
