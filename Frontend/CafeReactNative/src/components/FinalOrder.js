import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions
} from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';


export default class FinalOrder extends React.Component {
  static navigationOptions = {
    title: 'Your order',
  };
constructor(props) {
  super(props);
  this.state = {
    yourOrder: [
      {
        id: '1',
        name: "Espresso",
        price: 1.3,
        cups: 0
      },
      {
        id: '2',
        name: "Pinable",
        price: 1.3,
        cups: 0
      },
      {
        id: '3',
        name: "kings",
        price: 1.3,
        cups: 0
      },
      {
        id: '4',
        name: "fishes",
        price: 1.3,
        cups: 0
      },
    ]
  }
}
// componentDidMount() {
//  fetch('http://localhost:3000/orders')
//   .then(function (response, err) {return response.json();})
//   .then(function (result) {
//
//     console.log(result);
//     this.setState({yourOrder: result});
//   }.bind(this)).catch((err) => {
//     console.warn('Error!!!!! :' + err );
//   });
// }


renderDrink = ({item, index}) => {
  return (
    <View item={item} style={styles.container}>
    <Text style={styles.textInput}> {item.name} </Text>
    <Text style={{textAlign: 'center'}}>{item.price}</Text>
    </View>
  );
}
  render() {
    return (
      <View style={styles.container}>
        <FlatList keyExtractor={item => item.id} data={this.state.yourOrder} renderItem={this.renderDrink} extraData={this.state} numColumns={1}>
        </FlatList>
      </View>
    );
  }

  _signOutAsync = async () => {
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
          flex: 2,
          flexDirection: 'column',
          width: Dimensions.get('window').width,
          height: 40,

    },
    textInput: {
      fontSize: 20,
      backgroundColor: 'skyblue'
    }
});
