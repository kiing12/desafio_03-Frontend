import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Cat } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export default function ListScreen({ navigation }: Props) {
  const [cats, setCats] = useState<Cat[]>([]);

  const loadCats = async () => {
    const res = await axios.get('http://localhost:3333/cats');
    setCats(res.data);
  };

  useEffect(() => {
    loadCats();
  }, []);

  const openDetails = (cat: Cat) => {
    navigation.navigate('Detail', { cat });
  };

  const openCreate = () => {
    navigation.navigate("List", undefined);

  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity onPress={openCreate}>
        <Text>Adicionar Gato</Text>
      </TouchableOpacity>

      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openDetails(item)}>
            <Text>{item.name}</Text>
            <Text>{item.breed}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
