import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route, navigation }: Props) {
  const { cat } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome: {cat.name}</Text>
      <Text>Raça: {cat.breed}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('CreateEdit', { cat })}
      >
        <Text>Editar</Text>
      </TouchableOpacity>
    </View>
  );
}
// export type Cat = {