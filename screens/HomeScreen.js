import React, { useContext, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProductContext } from '../context/ProductContext';
import SneakerCard from '../components/SneakerCard';
import BottomTabBar from '../components/BottomTabBar';

export default function HomeScreen() {

  const { products, loadProducts, getTopFavs, getMostRecent, getMostExpensive } = useContext(ProductContext);
  const navigation = useNavigation();

  useEffect(() => {
    loadProducts();
  }, []);

  const topFavs = getTopFavs()
  const mostRecent = getMostRecent()
  const mostExpensive = getMostExpensive()

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.sectionTitle}>Top Favoritos</Text>
      <FlatList
        data={topFavs}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <SneakerCard
            sneaker={item}
            onPress={() => navigation.navigate('Product', { sneaker: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.sectionTitle}>Mas Recientes</Text>
      <FlatList
        data={mostRecent}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <SneakerCard
            sneaker={item}
            onPress={() => navigation.navigate('Product', { sneaker: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <Text style={styles.sectionTitle}>Mas Caras</Text>
      <FlatList
        data={mostExpensive}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <SneakerCard
            sneaker={item}
            onPress={() => navigation.navigate('Product', { sneaker: item })}
          />
        )}
        contentContainerStyle={styles.list}
      />
      </ScrollView>
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingHorizontal: 0,
  },
  sectionTitle: {
    fontFamily: "arial",
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 17,
  },
});