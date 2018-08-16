import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from '../innerMargin';

export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo} source={require('../../images/coffecup.png')}/>
          <Text style={styles.title}>Cafe React Native</Text>
        </View>

        <InnerMargin>
        <FormInput placeholder="Email" style={styles.inputStyle}
        placeholderTextColor="#3AD7FF"/>
        </InnerMargin>
        <FormInput placeholder="Password" secureTextEntry={true} placeholderTextColor="#3AD7FF"/>

        <InnerMargin></InnerMargin>
        <Button title="Login" backgroundColor="#3AD7FF" color='black'/>
      </View>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 120,
    height: 120
  },
  title: {
    color: 'grey',
    marginTop: 10,
    width: 170,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 14
  }
});
