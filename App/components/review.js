import React, { Component } from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Nav from './global-widgets/nav';
import Communications from 'react-native-communications';

const { width } = Dimensions.get('window');


export default class Review extends Component {
  card = null;

  constructor(props) {
    super(props);
    this.card = this.props.userData.card;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Nav type="review"
             toProfile={() => this.props.navigator.push({ id: 'profile' })}
             toHome={() => this.props.navigator.push({ id: 'home' })}/>
        <ScrollView style={styles.container}>
          <Image source={{ uri: this.card.image }} resizeMode="contain" style={{ height: 250, width: width }}/>
          <View style={[styles.row, { marginTop: 15 }]}>
            <Text style={{ fontSize: 19, fontWeight: '400' }}>{this.card.name}, </Text><Text
            style={{ fontSize: 21, fontWeight: '300', marginBottom: -2 }}>{this.card.age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#444', fontSize: 15 }}>{this.card.location.address}</Text>
          </View>
          <View style={styles.description}>
            <Text style={{ color: '#555' }}>{this.card.description}</Text>
          </View>
          <Button title={'Call ' + this.card.tel} style={styles.row}
                  onPress={() => Communications.phonecall(this.card.tel, true)}>
          </Button>
        </ScrollView>
      </View>
    );
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
