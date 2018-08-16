import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator, StatusBar } from 'react-native';
import Login from './src/components/Login.js';
import Home from './src/components/Home.js';
import FinalOrder from './src/components/FinalOrder.js';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';





class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
   title: 'Please sign in',
 };

  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


const AppStack = createStackNavigator({ Home: Home, Other: FinalOrder });
const AuthStack = createStackNavigator({ SignIn: Login });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
