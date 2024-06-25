import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ProductContext } from '../context/ProductContext';

export default function SneakerCard({sneaker, onPress}) {
  const { addFav, removeFav, isFav } = useContext(ProductContext);

  const handleFav = () => {
    if (isFav(sneaker.id)) {
      removeFav(sneaker.id)
    } else {
      addFav(sneaker)
    }
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{ uri: sneaker.image }} style={styles.image} />
        <Text style={styles.name}>{sneaker.name}</Text>
        <Text style={styles.marca}>{sneaker.marca}</Text>
        <Text style={styles.price}>${sneaker.price}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFav} style={styles.favoriteButton}>
        <AntDesign name="hearto" size={24} color={isFav(sneaker.id) ? "red" : "black"}  />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  name: {
    fontFamily: "Arial",
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    fontFamily: "Arial",
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  marca: {
    color: "gray",
    fontFamily: "Arial",
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
  },
});