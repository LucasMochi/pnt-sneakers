import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomTabBar from '../components/BottomTabBar';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function UserScreen() {

  const { user, logout } = useContext(AuthContext)
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.profileName}>{user.firstName + " " + user.lastName}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Fav')}>
          <AntDesign name="hearto"  style={styles.menuIcon} size={20} />
          <Text style={styles.menuText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ShopKart')}>
          <AntDesign name="shoppingcart"  style={styles.menuIcon} size={20} />
          <Text style={styles.menuText}>Carrito de compra</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={ () => logout()}>
        <AntDesign name="logout"  style={styles.menuIcon} size={20} />
          <Text style={styles.menuText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </View>
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  profileName: {
    fontFamily: "arial",
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontFamily: "arial",
    fontSize: 16,
    color: '#666',
  },
  profileSection: {
    backgroundColor: '#DCE1E0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
});
