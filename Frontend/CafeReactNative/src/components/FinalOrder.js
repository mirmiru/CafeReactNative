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

var summaOrder = 0;

export default class FinalOrder extends React.Component {
  static navigationOptions = {
    title: 'Your order',
  };
constructor(props) {
  super(props);
  this.state = {
    summa: 0,
    yourOrder: [
      {
        id: '1',
        name: "Espresso",
        price: 1,
        cups: 0
      },
      {
        id: '2',
        name: "Pinable",
        price: 1,
        cups: 0
      },
      {
        id: '3',
        name: "kings",
        price: 1,
        cups: 0
      },
      {
        id: '4',
        name: "fishes",
        price: 1,
        cups: 0
      },
    ]
  }
}
// componentDidMount() {
//  fetch('http://localhost:3000/')
//   .then(function (response, err) {return response.json();})
//   .then(function (result) {
//
//     console.log(result);
// //    this.setState({yourOrder: result});
//   }.bind(this)).catch((err) => {
//     console.warn('Error!!!!! :' + err );
//   });
// }


renderDrink = ({item, index}) => {
  summaOrder = summaOrder + item.price;
  return (
    <View item={item} style={styles.container}>
    <Text style={styles.textInput}> {item.name}       Price :{item.price} Kr</Text>
    </View>
  );
}


  render() {
    this.state.yourOrder.forEach(function(item){ summaOrder=summaOrder+item.price });

    return (
      <View style={styles.container}>
        <FlatList keyExtractor={item => item.id} data={this.state.yourOrder} renderItem={this.renderDrink} extraData={this.state} numColumns={1}>
        </FlatList>
        <Text>PRICE : {summaOrder}</Text>
      </View>
    );
  }


// vet inte om vi behöver
  _signOutAsync = async () => {
    this.props.navigation.navigate('Auth');
  };
/////////////
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
