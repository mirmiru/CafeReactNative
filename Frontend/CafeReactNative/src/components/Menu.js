import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Image, List, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import InnerMargin from './innerMargin';


const columns = 2;

export default class Menu extends Component {
  constructor(props) {
    super();
    this.state = {
      originalMenu: [],
      customerOrder: [
          {
            name: "Espresso",
            cups: 0
          },
          {
            name: "Drip Coffee",
            cups: 0
          },
          {
            name: "Cold Brew",
            cups: 0
          },
          {
            name: "Ice Tea",
            cups: 0
          },
          {
            name: "Hot Tea",
            cups: 0
          },
          {
            name: "Cappuccino",
            cups: 0
          },
          {
            name: "Latte",
            cups: 0
          },
          {
            name: "Americano",
            cups: 0
          }
      ]
    }
  }
  componentDidMount() {
   fetch('http://localhost:3000/')
    .then(function (response, err) {return response.json();})
    .then(function (result) {
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
        console.log(result);
    //    this.props.navigation.navigate('Other');
      }.bind(this)).catch((err) => {
        console.warn('Error!!!!! :' + err );
      });
  }
  renderDrink = ({item, index}) => {
    console.log(this.state.customerOrder[index].cups);
    return (
      <View item={item} style={gridStyle.item}>
      <Image source={item.img} />
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



// const menuData = [
//       {
//         id: 'espresso',
//         img: require("../images/espresso.png"),
//         name: "Espresso",
//         price: 2.10,
//       },
//       {
//         id: 'dripcoffee',
//         img: require("../images/dripcoffee.png"),
//         name: "Drip Coffee",
//         price: 2.20,
//       },
//       {
//         id: 'coldbrew',
//         img: require("../images/coldbrew.png"),
//         name: "Cold Brew",
//         price: 3.00,
//       },
//       {
//         id: 'icetea',
//         img: require("../images/icetea.png"),
//         name: "Ice Tea",
//         price: 2.95,
//       },
//       {
//         id: 'hottea',
//         img: require("../images/hottea.png"),
//         name: "Hot Tea",
//         price: 2.95,
//       },
//       {
//         id: 'cappuccino',
//         img: require("../images/cappuccino.png"),
//         name: "Cappuccino",
//         price: 2.85,
//       },
//       {
//         id: 'latte',
//         img: require("../images/latte.png"),
//         name: "Latte",
//         price: 2.95,
//       },
//       {
//         id: 'americano',
//         img: require("../images/americano.png"),
//         name: "Americano",
//         price: 2.40,
//       }
// ];
