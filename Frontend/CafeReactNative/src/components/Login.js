import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from './innerMargin';

import { AsyncStorage } from "react-native";

var ReactDOM = require('react-dom');

let USERKEY = "userList";


export default class Login extends Component {
  static navigationOptions = {
    //title: 'Please sign in',
    header: null
  };

  componentDidMount() {
    if (this.retrieveUsers() != null) {
      this.setState({ userList: this.retrieveUsers() });
    } else {
      this.setState({ userList: [] });
    }
  }

  constructor(props) {
    super(props);
  }

  async storeUsers(listOfUsers) {
    try {
        var jsonOfItem = await AsyncStorage.setItem(USERKEY, JSON.stringify(listOfUsers));
        return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveUsers() {
    try {
      const retrievedItem =  await AsyncStorage.getItem(USERKEY);
      const listOfUsers = JSON.parse(retrievedItem);
      return listOfUsers;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  addUser(email, password) {
    if (email == null || email == undefined) {
      console.warn("Email is null!");
    }
    const newUser = {
      email: email,
      password: password
    };

    // the current list of items
    var list = [this.state.userList];

    // add the new item to the list
    list.push(newUser);

    // update state with new list
    this.setState({ list });

    this.storeUsers("userList", list);
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
          <FormInput ref='forminput' textInputRef='email' placeholder="Email" style={styles.inputStyle}
            placeholderTextColor="#808080"/>
        </InnerMargin>
        <FormInput ref='forminput' textInputRef='password' placeholder="Password" secureTextEntry={true} placeholderTextColor="#808080"/>

        <InnerMargin></InnerMargin>
        <Button title="Login" backgroundColor="#808080" color='black'
          onPress={this._signInAsync}/>


        {/*<View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
        </View>*/}

      </KeyboardAvoidingView>
    );
  }

  logIn() {
    this.addUser('e','e');
    let email = this.refs.forminput.refs.email;
    let password = this.refs.forminput.refs.password;
    /*console.warn(email);
    console.warn(password);*/

    if (this.loginSuccess(email, password)) {
      this.props.navigation.navigate('App');
    }
  }

  _signInAsync = async () => {
    this.logIn();
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
