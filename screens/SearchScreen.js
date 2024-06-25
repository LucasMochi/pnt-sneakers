import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import SneakerCard from '../components/SneakerCard';
import { ProductContext } from '../context/ProductContext';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const { searchQuery, setSearchQuery, searchResults } = useContext(ProductContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por modelo o marca..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
        />
      </View>
      <View style={styles.content}>
        {searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
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
        ) : (
          <Text style={styles.noResults}>No se encontraron resultados</Text>
        )}
      </View>
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#DCE1E0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
    marginHorizontal: 10,
  },
  list: {
    justifyContent: 'space-between', // Añade espacio entre las columnas
  },
  noResults: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
    textAlign: 'center', // Centra el texto
  },
});
