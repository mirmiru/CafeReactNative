import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from './innerMargin';

export default class Login extends Component {
  static navigationOptions = {
    //title: 'Please sign in',
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      newUser: "",
      userList: []
    };
  }

  updateInput(key, value) {
    this.setState({ [key]: value });
  }

  addUser(email, password) {
    // create a new item
    const newUser = {
      email: email,
      password: password
    };

    // copy current list of items
    const list = [...this.state.userList];

    // add the new item to the list
    list.push(newUser);

    // update state with new list, reset the new user input
    this.setState({
      list,
      newUser: ""
    });
  }

  logIn(email, password) {
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

  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.addUser('eric','3');
    /*let emailForm = this.document.getElementById('Email');
    let passwordForm = this.document.getElementById('Password');
    console.log(emailForm.value);
    if (this.logIn(emailForm.value, passwordForm.value)) {
      this.props.navigation.navigate('App');
    }*/
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
