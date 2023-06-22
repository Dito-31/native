import 'react-native-gesture-handler';
import Home from './src/components/Home.js'
import Main from './src/components/Main.js'
import Screen from './src/components/Screen.js'
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BasketContext from './src/components/BasketContext.js'
export default function App() {
  const [basket,setBasket]=useState([])
  const Stack = createStackNavigator();

  return (
      <BasketContext.Provider value={{basket,setBasket}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Screen" component={Screen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BasketContext.Provider>
    
  );
}

