import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

export default function ProductScreen({ route }) {
  const navigation = useNavigation()
  const { sneaker } = route.params

  const { addFav, removeFav, isFav, addShopKart, isInShopKart } = useContext(ProductContext)

  const handleFav = () => {
    if (isFav(sneaker.id)) {
      removeFav(sneaker.id)
    } else {
      addFav(sneaker)
    }
  };

  const handleBuy = () => {
    if (!isInShopKart(sneaker.id)) {
        addShopKart(sneaker)
        alert('Agregada al carrito de compra')
    } else {
        alert("Ya esta en el carrito de compra")
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: sneaker.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{sneaker.name}</Text>
        <Text style={styles.price}>${sneaker.price}</Text>
        <TouchableOpacity onPress={handleFav} style={styles.favoriteButton}>
          <AntDesign name="hearto" size={24} color={isFav(sneaker.id) ? "red" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBuy} style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginVertical: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  buyButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
