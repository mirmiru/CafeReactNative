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

  // Hämtar en token från localstorage. Navigerar sen till rätt plats.
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // Växlar till meny-skärmen eller login-skärmen.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

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
