import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HabitProvider } from './src/context/HabitContext';

import DashboardScreen from './src/screens/DashboardScreen';
import VaultLockScreen from './src/screens/VaultLockScreen';
import VaultScreen from './src/screens/VaultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HabitProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="VaultLockScreen" component={VaultLockScreen} />
          <Stack.Screen name="VaultScreen" component={VaultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </HabitProvider>
  );
}