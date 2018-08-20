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
      menu: [
        {
          name: 'Americano',
          cups: 0
        },
        {
          name: 'Coffee',
          cups: 0
        },
        {
          name: 'Latte',
          cups: 0
        }
      ]
    }
  }
  decreaseCounter(item, index) {
    var update = Object.assign(this.state.menu[index]);
    update.cups = update.cups-1;
    console.log('New drink values:', update);
    this.setState({
      menu: [...this.state.menu.slice(0, index),
      Object.assign({}, this.state.menu[index], update),
      ...this.state.menu.slice(index+1)]
    });
    console.log(this.state);
  }
  increaseCounter(item, index) {
    var update = Object.assign(this.state.menu[index]);
    update.cups = update.cups+1;
    console.log('New drink values:', update);
    this.setState({
      menu: [...this.state.menu.slice(0, index),
      Object.assign({}, this.state.menu[index], update),
      ...this.state.menu.slice(index+1)]
    });
  }
  renderDrink = ({item, index}) => {
    console.log(this.state.menu[index].cups);
    return (
      <View item={item} style={gridStyle.item}>
      <Image source={item.img} />
          <Text style={gridStyle.itemText}>{item.name} ({item.price})</Text>
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={item => this.decreaseCounter(item, index)}><Text style={gridStyle.itemText}> &#8722; </Text></TouchableOpacity>
          <Text style={gridStyle.itemText}> {this.state.menu[index].cups} </Text>
          <TouchableOpacity onPress={item => this.increaseCounter(item, index)}><Text style={gridStyle.itemText}> &#43; </Text></TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    console.log('Render');
    return (
    <FlatList keyExtractor={item => item.id} data={menuData} renderItem={this.renderDrink} extraData={this.state} numColumns={2}>
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
