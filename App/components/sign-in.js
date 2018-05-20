import React, { Component } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import HttpClient from '../service/http-client';

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  signIn() {
    HttpClient.signIn(this.state).then(response => {
      this.props.navigator.replace({ id: 'home' })
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
        <Text style={{ textAlign: 'center', fontSize: 32, marginBottom: 15 }}>Sign In</Text>
        <View>
          <Text>Username:</Text>
          <TextInput name='username' onChangeText={(username) => this.setState({ username })}/>
        </View>
        <View>
          <Text>Password:</Text>
          <TextInput secureTextEntry={true} onChangeText={(password) => this.setState({ password })}/>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={() => this.signIn()} title='Sign In'/>
        </View>
      </View>
    )
  }
}
