import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import UserScreen from './screens/UserScreen';
import FavScreen from './screens/FavScreen';
import ProductScreen from './screens/ProductScreen';
import ShopKartScreen from './screens/ShopKartScreen';
import { ProductProvider } from './context/ProductContext';

const Stack = createStackNavigator();

function AppNavigator(){
  const { status } = useContext(AuthContext)
  
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white'
        }
      }}>
      {
        status !== "authenticated" ? (
          <>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) :
        (
          <>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Search" component={SearchScreen}/>
            <Stack.Screen name="User" component={UserScreen}/>
            <Stack.Screen name="Product" component={ProductScreen}/>
            <Stack.Screen name="Fav" component={FavScreen}/>
            <Stack.Screen name="ShopKart" component={ShopKartScreen}/>
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ProductProvider>  
    </AuthProvider>
  );
}

