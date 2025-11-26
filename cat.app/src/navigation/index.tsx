import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import CreateEditScreen from '../screens/CreateEditScreen';

import { RootStackParamList } from '../types';

// 🔥 AQUI está o ponto principal do erro que você tinha
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="CreateEdit" component={CreateEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
