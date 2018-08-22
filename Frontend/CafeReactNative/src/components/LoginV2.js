import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import InnerMargin from './innerMargin.js';

export default class LoginV2 extends Component {
  //state management
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  //Lifecycemethod of state, checks if user has already logged in previously
  componentDidMount() {
    this._loadInitialState().done();
  }

  //Check App.js for same _bootstrapAsync function.., tying to implement here
  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('App');
    }
  }

    static navigationOptions = {
     //title: 'Please sign in',
     header: null
   };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>


        <View style={styles.logoContainer}>
          <Image
          source={require('../images/fbCoffee2.png')}/>
          <InnerMargin></InnerMargin>
          <Image
          style={styles.logo} source={require('../images/fistBumpCoffee.png')}/>
          {/*<Text style={styles.title}>Cafe React Native</Text>*/}
        </View>

        <InnerMargin>

        <FormInput
        placeholder="Username"
        autoCapitalize="none"
        style={styles.inputStyle}
        placeholderTextColor="#808080"
        //onChangeText={ (username) => {console.log(username);}}
        onChangeText={ (username) => this.setState({username}) }
        underlineColorAndroid='transparent'
        />
        </InnerMargin>

        <FormInput
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry={true}
        placeholderTextColor="#808080"
        onChangeText={ (password) => this.setState({password}) }
        underlineColorAndroid='transparent'
        />

        <InnerMargin></InnerMargin>

        <Button title="Login with Expresso"
        backgroundColor="#00EFD1"
        color='#F7F7F7'
        borderRadius={10}
        //onPress={this._signInAsync}
        //alert test
        onPress={this.login}
        />

      </KeyboardAvoidingView>
    );
  }

  login = () => {

    //alert('test');
    alert(this.state.username);

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })

    .then((response) => response.json())
    .then ((res) => {

      console.log(res);
      if(res.login) {
        // AsyncStorage.setItem('user, res.user');
        console.log('Kollar om inne i');
        this.props.navigation.navigate('App');
      } else {
        // alert(res.message);
        console.log('inne i else unauth');
      }
    })
    .done();
  }

  //default function from React navigation auth flow changed to 'login' above
  // _signInAsync = async () => {
  //   // await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };

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
  // title: {
  //   color: 'grey',
  //   marginTop: 10,
  //   width: 170,
  //   textAlign: 'center',
  //   opacity: 0.8,
  //   marginTop: 14
  // }
});
