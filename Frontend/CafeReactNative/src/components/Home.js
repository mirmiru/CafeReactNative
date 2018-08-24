import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Button } from 'react-native';
import InnerMargin from './innerMargin';
import Menu from './Menu.js';
import withNavigation from 'react-navigation';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Welcome home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Menu></Menu>
        
      </View>

    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
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
