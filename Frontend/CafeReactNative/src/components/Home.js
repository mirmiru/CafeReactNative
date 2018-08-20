import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Button } from 'react-native';
import InnerMargin from './innerMargin';
import Menu from './Menu.js';

export default class Home extends Component {
  static navigationOptions = {
   title: 'Wellcome HOme',
 };

  render() {
    return (
      <View style={styles.container}>
        <Menu></Menu>
      <Button title="Show me more of the app" onPress={this._showMoreApp} />
          <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>

    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

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
