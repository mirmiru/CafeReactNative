import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from './innerMargin';

export default class Login extends Component {
  static navigationOptions = {
     title: 'Please sign in',
   };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo} source={require('../images/CafeReactNativeLogoV1.png')}/>
          <Text style={styles.title}>Cafe React Native</Text>
        </View>

        <InnerMargin>
        <FormInput placeholder="Email" style={styles.inputStyle}
        placeholderTextColor="yellow"/>
        </InnerMargin>
        <FormInput placeholder="Password" secureTextEntry={true} placeholderTextColor="yellow"/>

        <InnerMargin></InnerMargin>
        <Button title="Login" backgroundColor="yellow" color='black'/>

      </View>
      <View style={styles.container}>
             <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

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
