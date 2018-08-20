import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, List, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import InnerMargin from './innerMargin';

const menuData = [
  {
    img: require("../images/americano.png"),
    name: "Americano",
    price: 2.50
  },
  {
    img: require("../images/dripcoffee.png"),
    name: "Coffee",
    price: 2.50
  },
  {
    img: require("../images/latte.png"),
    name: "Latte",
    price: 2.80
  }
  // ,
  // {
  //   img: require("../images/hottea.png"),
  //   name: "Tea",
  //   price: 2.80
  // }
];

const columns = 2;

export default class Menu extends Component {
  constructor(props) {
    super();
    this.state = {
      counter: 0
    }
  }
  decreaseCounter() {
    this.setState({counter: this.state.counter-1});
  }
  increaseCounter() {
    var value = this.state.counter+1;
    this.setState({counter: value});
  }
  renderDrink({item, index}) {
    return (
      <View style={gridStyle.item}>
      <Image source={String(item.img)} />
          <Text style={gridStyle.itemText}>{item.name} ({item.price})</Text>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.decreaseCounter}><Text style={gridStyle.itemText}> &#8722; </Text></TouchableOpacity>
          <Text style={gridStyle.itemText}> {this.state.counter} </Text>
          <TouchableOpacity onPress={() => this.increaseCounter}><Text style={gridStyle.itemText}> &#43; </Text></TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    return (
    <FlatList keyExtractor={item => item.id} data={menuData} renderItem={this.renderDrink} numColumns={2}>
    </FlatList>
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
    // flexDirection: 'row'
    justifyContent: 'space-around'
  }

});
