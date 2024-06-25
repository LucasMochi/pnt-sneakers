import React, { useContext, useEffect } from 'react'
import { FlatList, View, StyleSheet, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ProductContext } from '../context/ProductContext'
import SneakerCard from '../components/SneakerCard'

export default function FavScreen() {

  const { favs, loadProducts } = useContext(ProductContext)
  const navigation = useNavigation()

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitle}>
        <Text style={styles.textTitle}>Mis Favoritos</Text>
      </View>
      <FlatList
        data={favs}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={({ item }) => (
          <SneakerCard
            sneaker={item}
            onPress={() => navigation.navigate('Product', { sneaker: item })}
          />
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