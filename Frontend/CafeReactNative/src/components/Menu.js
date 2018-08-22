import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image, List, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import InnerMargin from './innerMargin';
import Images from '../images/Images.js';
import {withNavigation} from 'react-navigation';

const columns = 2;

// export default class Menu extends Component {
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalMenu: [],
      customerOrder: [
          {
            name: "Espresso",
            cups: 0,
            price: 2.10
          },
          {
            name: "Drip Coffee",
            cups: 0,
            price: 2.20
          },
          {
            name: "Cold Brew",
            cups: 0,
            price: 3.00
          },
          {
            name: "Ice Tea",
            cups: 0,
            price: 2.95
          },
          {
            name: "Hot Tea",
            cups: 0,
            price: 2.95
          },
          {
            name: "Cappuccino",
            cups: 0,
            price: 2.85
          },
          {
            name: "Latte",
            cups: 0,
            price: 2.95
          },
          {
            name: "Americano",
            cups: 0,
            price: 2.40
          }
      ]
    }
  }
  componentDidMount() {
   fetch('http://localhost:3000/')
    .then(function (response, err) {return response.json();})
    .then(function (result) {
      console.log('Orig menu: ', result);
      this.setState({originalMenu: result});
    }.bind(this)).catch((err) => {
      console.warn('Error!!!!! :' + err );
    });
  }
  decreaseCounter(item, index) {
    var update = Object.assign(this.state.customerOrder[index]);
    update.cups = update.cups-1;
    this.setState({
      menu: [...this.state.customerOrder.slice(0, index),
      Object.assign({}, this.state.customerOrder[index], update),
      ...this.state.customerOrder.slice(index+1)]
    });
    console.log(this.state);
  }
  increaseCounter(item, index) {
    var update = Object.assign(this.state.customerOrder[index]);
    update.cups = update.cups+1;
    this.setState({
      menu: [...this.state.customerOrder.slice(0, index),
      Object.assign({}, this.state.customerOrder[index], update),
      ...this.state.customerOrder.slice(index+1)]
    });
  }
  placeOrder() {
    var finalOrder = this.state.customerOrder.filter(item => item.cups > 0);
    console.log('FINAL:', finalOrder);

    fetch('http://localhost:3000/', {
      body: JSON.stringify(finalOrder),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json())
      .then(function (result) {
      console.log('POST HUH?:', result['_id']);
    //    this.props.navigation.navigate('Other');

    // myKey ska vara order keyn som skapas av mongo
      this.props.navigation.navigate('Other', {myKey: result['_id']});
      }.bind(this)).catch((err) => {
        console.warn('Error!!!!! :' + err );
      });
  }
  renderDrink = ({item, index}) => {
    return (
      <View item={item} style={gridStyle.item}>
      <Image source={Images[index]} />
          <Text style={gridStyle.itemText}>{item.name} ({item.price})</Text>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={item => this.decreaseCounter(item, index)}><Text style={gridStyle.itemText}> &#8722; </Text></TouchableOpacity>
          <Text style={gridStyle.itemText}> {this.state.customerOrder[index].cups} </Text>
          <TouchableOpacity onPress={item => this.increaseCounter(item, index)}><Text style={gridStyle.itemText}> &#43; </Text></TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return (
    <View>
    <FlatList keyExtractor={item => item.id} data={this.state.originalMenu} renderItem={this.renderDrink} extraData={this.state} numColumns={2}>
    </FlatList>
    <Button onPress={this.placeOrder.bind(this)} title='Place Order' />
    </View>
    );
  }
};

const gridStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    height: Dimensions.get('window').width / 2
  },
  itemText: {
    color: '#ffffff',
    justifyContent: 'space-around'
  }
});

export default withNavigation(Menu);
