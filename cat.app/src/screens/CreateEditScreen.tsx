import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateEdit'>;

export default function CreateEditScreen({ route, navigation }: Props) {
  const cat = route.params?.cat;

  const [name, setName] = useState(cat?.name ?? '');
  const [breed, setBreed] = useState(cat?.breed ?? '');

  const save = async () => {
    if (cat) {
      await axios.put(`http://localhost:3333/cats/${cat.id}`, {
        name,
        breed,
      });
    } else {
      await axios.post('http://localhost:3333/cats', {
        name,
        breed,
      });
    }

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} />
      <TextInput placeholder="Raça" value={breed} onChangeText={setBreed} />

      <Button title="Salvar" onPress={save} />
    </View>
  );
}
//     id: string;