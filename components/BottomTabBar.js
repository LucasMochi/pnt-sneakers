import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.tabBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.tabItem}>
        <Ionicons name="home" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.tabItem}>
        <Ionicons name="search" size={30} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('User')} style={styles.tabItem}>
        <Ionicons name="person" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#000000', 
    height: 50,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


