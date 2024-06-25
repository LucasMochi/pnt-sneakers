import React, { useContext, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductContext } from '../context/ProductContext';
import SneakerCard from '../components/SneakerCard';

export default function ShopKartScreen() {

  const { shopKart, isInShopKart, removeShopKart, loadProducts } = useContext(ProductContext);
  const navigation = useNavigation();

  useEffect(() => {
    loadProducts();
  }, []);
    
  const handleElim = (sneakerId) => {
    if (isInShopKart(sneakerId)) {
      removeShopKart(sneakerId);
    } 
    };

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitle}>
        <Text style={styles.textTitle}>Mi carrito de compra</Text>
      </View>
      <FlatList
        data={shopKart}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={({ item }) => (
        <View>
          <SneakerCard
            sneaker={item}
            onPress={() => navigation.navigate('Product', { sneaker: item })}
          />
          <TouchableOpacity onPress={() => handleElim(item.id)} style={styles.elimButton}>
            <Text style={styles.elimButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
      contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    list: {
      paddingHorizontal: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      paddingVertical: 10,
    },
    elimButton: {
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 5,
    },
    elimButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 25,
      paddingVertical: 20,
      paddingHorizontal: 20,
      backgroundColor: '#DCE1E0',
      alignItems: 'center',
    },
    textTitle: {
      fontFamily: "arial",
      fontSize: 20,
      fontWeight: 'bold',
    }
  });