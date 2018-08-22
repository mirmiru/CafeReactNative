import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from './innerMargin';

import { AsyncStorage } from "react-native";

let USERKEY = "userList";


export default class Login extends Component {
  static navigationOptions = {
    //title: 'Please sign in',
    header: null
  };

  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
  }

  async componentDidMount() {
    let listOfUsers = await this.retrieveUsers();

    if (listOfUsers !== null && listOfUsers !== undefined) {
      this.setState({ userList: listOfUsers, emailInput: "", passwordInput: "" });
    } else {
      this.setState({ userList: [], emailInput: "", passwordInput: "" });
    }
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
          <FormInput autocorrect="off" autoCapitalize="none" autocomplete="off" ref={function functionName(input) { this.emailForm = input; }.bind(this)} onChangeText={function (text) { this.state.emailInput = text; }.bind(this)} textInputRef='email'
            placeholder="Email" style={styles.inputStyle}
            placeholderTextColor="#808080"/>
        </InnerMargin>

        <FormInput autocorrect="off" autoCapitalize="none" autocomplete="off" ref={function functionName(input) { this.passwordForm = input; }.bind(this)} onChangeText={function (text) { this.state.passwordInput = text; }.bind(this)} textInputRef='password'
          placeholder="Password" secureTextEntry={true} placeholderTextColor="#808080"/>

        <InnerMargin></InnerMargin>

        <Button title="Login" backgroundColor="#808080" color='black' onPress={this._signInAsync}/>

        {<View style={styles.container}>
          <Button title="Register" onPress={this._registerAsync} />
        </View>}

      </KeyboardAvoidingView>
    );
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
      if (listOfUsers !== null) {
        console.log("Users retrieved:");
        console.log(listOfUsers);
      }
      return listOfUsers;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  addUser(email, password) {

    const newUser = {
      userEmail: email,
      userPassword: password
    };

    // the current list of users
    var list = [...this.state.userList];

    // add the new user to the list
    list.push(newUser);
    console.log("Users in list:");
    console.log(list);
    // update state with new list
    this.setState({ list });
    // save to AsyncStorage
    this.storeUsers(list);
  }

  logIn() {
    let userEmail = this.state.emailInput;
    let userPassword = this.state.passwordInput;

    if (userEmail !== "" && userPassword !== "") {
      let loginSucceeded = this.loginSuccess(userEmail, userPassword);

      if (loginSucceeded) {
        this.props.navigation.navigate('App');
      } else {
        console.log('login failed...');
      }
    }
  }

  async loginSuccess(email, password) {
    let listOfUsers = await this.retrieveUsers();

    if (listOfUsers == null || listOfUsers == undefined) {
      console.log("List is null in method loginSuccess");
      return false;
    } else {
      for (var i = 0; i < listOfUsers.length; i++) {
        let user = listOfUsers[i];
        console.log(user.userEmail, email);
        console.log(user.userPassword, password);
        if (user.userEmail === email && user.userPassword === password) {
          return true;
        }
      }
      return false;
    }
  }

  _signInAsync = async () => {
    this.logIn();
  };

  _registerAsync = async () => {
    let userEmail = this.state.emailInput;
    let userPassword = this.state.passwordInput;

    if (userEmail != null && userPassword != null && userEmail != "" && userPassword != "") {
      this.addUser(userEmail, userPassword);
      // clear text in email and password
      this.emailForm.clearText();
      this.passwordForm.clearText();
      // this.props.navigation.navigate('App');
    }
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
  // title: {
  //   color: 'grey',
  //   marginTop: 10,
  //   width: 170,
  //   textAlign: 'center',
  //   opacity: 0.8,
  //   marginTop: 14
  // }
});
