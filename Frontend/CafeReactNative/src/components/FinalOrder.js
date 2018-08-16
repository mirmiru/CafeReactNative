import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';



export default class FinalOrder extends React.Component {
  static navigationOptions = {
    title: 'Order STuff',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
