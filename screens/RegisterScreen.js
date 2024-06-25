import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { AuthContext } from "../context/AuthContext.js"

export default function RegisterScreen() {
    
    const {status, register} = useContext(AuthContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleRegister = () => {
        register(email, password, firstName, lastName)
    }
    
    useEffect( () => {
        if( status === 'authenticated'){
          navigation.navigate('Home')
        }
      }, [status, navigation])

    return (
        <View style={styles.container}>
          <Text style={styles.title}>{'Registrarse'}</Text>
          
          <TextInput 
            style={ styles.input}
            placeholder='Ingrese su Nombre'
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput 
            style={ styles.input}
            placeholder='Ingrese su Apellido'
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput 
            style={ styles.input}
            placeholder='Ingrese su Email'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput 
            style={ styles.input}
            placeholder='Ingrese su Contraseña'
            keyboardType='password'
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.menuItem} onPress={handleRegister}>
            <Text style={styles.menuText}>Registrate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.menuText}>Iniciar sesion</Text>
          </TouchableOpacity>
        </View>
      );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      title:{
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
      },
      input:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
      },
      orText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
      },
      menuText: {
        fontSize: 16,
        textAlign: 'center'
      },
    });
