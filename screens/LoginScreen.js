import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'

export default function LoginScreen() {

    const { status, login } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const handleLogin = async () => {
        await login(email, password)
        if (status === 'authenticated') {
            navigation.navigate('Home')
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            navigation.navigate("Home")
        }
    }, [status, navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar sesión</Text>
          
            <TextInput 
                style={styles.input}
                placeholder='Ingrese su Email'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.input}
                placeholder='Ingrese su Contraseña'
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.menuItem} onPress={handleLogin}>
                <Text style={styles.menuText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.menuText}>Registrarse</Text>
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
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
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