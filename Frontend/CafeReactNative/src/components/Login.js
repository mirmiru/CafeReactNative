import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from './innerMargin';

let USERKEY = "userList";
let ERRORLOGIN = "Login failed...";
let ACCOUNTCREATION = "Account created!";

export default class Login extends Component {
  static navigationOptions = {
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
          source={require('../images/fbCoffee2.png')}/>
          <InnerMargin></InnerMargin>
          <Image
          style={styles.logo} source={require('../images/fistBumpCoffee.png')}/>
        </View>

        <InnerMargin>

          <FormInput autocorrect="off" autoCapitalize="none" autocomplete="off" ref={function functionName(input) { this.emailForm = input; }.bind(this)} onChangeText={function (text) { this.state.emailInput = text; }.bind(this)} textInputRef='email'
            placeholder="Email" style={styles.inputStyle}
            placeholderTextColor="#808080"/>
        </InnerMargin>

        <FormInput autocorrect="off" autoCapitalize="none" autocomplete="off" ref={function functionName(input) { this.passwordForm = input; }.bind(this)} onChangeText={function (text) { this.state.passwordInput = text; }.bind(this)} textInputRef='password'
          placeholder="Password" secureTextEntry={true} placeholderTextColor="#808080"/>

        <InnerMargin></InnerMargin>

        <Button title="Login" borderRadius={10} backgroundColor="#00EFD1" onPress={this._signInAsync}/>

        <InnerMargin></InnerMargin>


        <Button title="Register" borderRadius={10} onPress={this._registerAsync} />

        <InnerMargin></InnerMargin>
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

async logIn() {
  let userEmail = this.state.emailInput;
  let userPassword = this.state.passwordInput;
  console.log(userEmail, userPassword);

  if (userEmail !== "" && userPassword !== "") {
    console.log('entered values');
    let loginSucceeded = await this.loginSuccess(userEmail, userPassword);

    if (loginSucceeded) {
      this.props.navigation.navigate('App');
    } else {
      alert(ERRORLOGIN);
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
      console.log(user);
      if (user.userEmail === email && user.userPassword === password) {
        console.log('Match');
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
    // Clears the text in email and password forms. Doesn't work on iOS simulator...
    this.emailForm.clearText();
    this.passwordForm.clearText();
    //ToastAndroid.show(ACCOUNTCREATION);
    alert('Account created!');
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 140,
    height: 140
  },
  logotext: {
    width: 50,
    height: 50
  }
});
