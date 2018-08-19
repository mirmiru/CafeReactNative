/* global localStorage */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from './innerMargin';

var localStorage;

export default class Login extends Component {
  static navigationOptions = {
    //title: 'Please sign in',
    header: null
  };

  componentDidMount() {
    if (typeof localStorage === "undefined" || localStorage === null) {
      localStorage = require('localstorage');
    }
    this.hydrateStateWithLocalStorage();
  }

  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  hydrateStateWithLocalStorage() {

    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.get(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (error) {
          // handle empty string
          this.setState({ [key]: "" });
        }
      }
    }
  }

  addUser(email, password) {

    const newUser = {
      email: email,
      password: password
    };

    // copy current list of items
    var list = this.state.userList;

    // add the new item to the list
    list.push(newUser);

    // update state with new list
    this.setState({ list });

    localStorage.put("userList", JSON.stringify(list));
  }

  loginSuccess(email, password) {
    for (var i = 0; i < this.state.userList.length; i++) {
      let user = this.state.userList[i];
      if (user.email === email && user.password === password) {
        return true;
      }
    }
    return false;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>

        <View style={styles.logoContainer}>
          <Image
            style={styles.logo} source={require('../images/CafeReactNativeLogoV1.png')}/>
          <Text style={styles.title}>Cafe React Native</Text>
        </View>

        <InnerMargin>
          <FormInput id="Email" placeholder="Email" style={styles.inputStyle}
            placeholderTextColor="#808080"/>
        </InnerMargin>
        <FormInput id="Password" placeholder="Password" secureTextEntry={true} placeholderTextColor="#808080"/>

        <InnerMargin></InnerMargin>
        <Button title="Login" backgroundColor="#808080" color='black'
          onPress={this._signInAsync}/>


        {/*<View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
        </View>*/}

      </KeyboardAvoidingView>
    );
  }

  function logIn() {
    this.addUser('eric','3');

    let emailForm = this.document.getElementById('Email');
    let passwordForm = this.document.getElementById('Password');

    console.log(emailForm.value);

    if (this.loginSuccess(emailForm.value, passwordForm.value)) {
      this.props.navigation.navigate('App');
    }
  }

  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    //logIn();
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
  // title: {
  //   color: 'grey',
  //   marginTop: 10,
  //   width: 170,
  //   textAlign: 'center',
  //   opacity: 0.8,
  //   marginTop: 14
  // }
});
