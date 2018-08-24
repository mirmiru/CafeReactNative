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
  // console.log(this.props.navigation.state.params.myKey);
 fetch('http://localhost:3000/order/' + this.props.navigation.state.params.myKey)
  .then(function (response, err) {console.log(response);return response.json();})
  .then(function (result) {
console.log('FINALORDER!!');
    console.log(result);
console.log('YourOrder!!');
        console.log(this.state.yourOrder);

     this.setState({yourOrder: result[0]['order']});
     var ex = 0;
      result[0]['order'].forEach(function(item){
        ex=ex+(item.price*item.cups);
        });

        this.setState({summaOrder : ex.toFixed(2) });
        console.log('SUMMAORDER!!');
      console.log(this.state.summaOrder);
  }.bind(this)).catch((err) => {
    console.warn('Error!!!!! :' + err );
  });
 }


renderDrink = ({item, index}) => {
  var c = item.price*item.cups;
  return (
    <View item={item} style={{ padding: 1, flexDirection: 'row', width: Dimensions.get('window').width}}>
      <View style={{flex: 1}}><Text style={styles.textInput} > {item.name}</Text></View>
      <View style={{flex: 1}}><Text style={styles.textCups} > {item.cups}</Text></View>
      <View style={{flex: 1}}><Text style={styles.textPrice} > {c.toFixed(2)}</Text></View>
    </View>
  );
}


  render() {

    return (
      <View >
        <View style={{backgroundColor: '#ac22cc', padding: 4, flexDirection: 'row', width: Dimensions.get('window').width}}>
          <View style={{flex: 1}}><Text style={styles.textInput} > NAME</Text></View>
          <View style={{flex: 1}}><Text style={styles.textCups} > AMOUNT</Text></View>
          <View style={{flex: 1}}><Text style={styles.textPrice} > PRICE</Text></View>
        </View>
      <FlatList keyExtractor={item => item.name} data={this.state.yourOrder} renderItem={this.renderDrink} extraData={this.state} numColumns={1}>
      </FlatList>
        <View style={{alignItems: 'stretch'}}>
          <Text style={styles.textSumma}>PRICE : {this.state.summaOrder}</Text>
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
      padding: 4,
      fontSize: 20
    },
    textPrice: {
      padding: 4,
      fontSize: 20,
      textAlign: 'right'

    },
    textCups: {
      padding: 4,
      textAlign: 'center',
      fontSize: 20
    },
    textSumma: {
      fontSize: 40,
      textDecorationLine: 'underline',
      color: 'purple',
      textAlign: 'right'
    }

});
