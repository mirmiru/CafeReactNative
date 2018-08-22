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
 componentDidMount() {
   console.log(this.props.navigation.state.params.myKey);
 fetch('http://localhost:3000/' + this.props.navigation.state.params.myKey)
  .then(function (response, err) {console.log(response);return response.json();})
  .then(function (result) {
console.log('FINALORDER!!');
    console.log(result);
//      this.setState({yourOrder: result});
  }.bind(this)).catch((err) => {
    console.warn('Error!!!!! :' + err );
  });
 }


renderDrink = ({item, index}) => {
  return (
    <View item={item} style={{ padding: 1, flexDirection: 'row', width: Dimensions.get('window').width}}>
      <View style={{flex: 1}}><Text style={styles.textInput} > {item.name}</Text></View>
      <View style={{flex: 1}}><Text style={styles.textCups} > {item.cups}</Text></View>
      <View style={{flex: 1}}><Text style={styles.textPrice} > {item.price}</Text></View>
    </View>
  );
}


  render() {
    this.state.yourOrder.forEach(function(item){ summaOrder=summaOrder+item.price });
    return (
      <View >
        <View style={{ padding: 1, flexDirection: 'row', width: Dimensions.get('window').width}}>
          <View style={{flex: 1}}><Text style={styles.textInput} > NAME</Text></View>
          <View style={{flex: 1}}><Text style={styles.textCups} > AMOUNT</Text></View>
          <View style={{flex: 1}}><Text style={styles.textPrice} > PRICE</Text></View>
        </View>
      <FlatList keyExtractor={item => item.name} data={this.state.yourOrder} renderItem={this.renderDrink} extraData={this.state} numColumns={1}>
      </FlatList>
        <View style={{alignItems: 'stretch'}}>
          <Text style={styles.textSumma}>PRICE : {summaOrder}</Text>
        </View>
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
          flex: 1,
          flexDirection: 'column',
          width: Dimensions.get('window').width,
          height: 40,

    },
    textInput: {
      fontSize: 20,
      backgroundColor: 'skyblue'
    },
    textPrice: {
      fontSize: 20,
      textAlign: 'right',
      backgroundColor: 'skyblue'
    },
    textCups: {
      textAlign: 'center',
      fontSize: 20,
      backgroundColor: 'skyblue'
    },
    textSumma: {
      fontSize: 40,
      backgroundColor: 'green',
      textAlign: 'right'
    }

});
