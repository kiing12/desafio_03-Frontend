import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "../services/api";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "CreateEdit">;

export default function CreateEditScreen({ route, navigation }: Props) {
  const cat = route.params?.cat;

  const [name, setName] = useState(cat?.name || "");
  const [breed, setBreed] = useState(cat?.breed || "");
  const [age, setAge] = useState(String(cat?.age || ""));

  const save = async () => {
    if (cat) {
      await api.put(`/cats/${cat.id}`, { name, breed, age: Number(age) });
    } else {
      await api.post("/cats", { name, breed, age: Number(age) });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Raça"
        value={breed}
        onChangeText={setBreed}
        style={styles.input}
      />
      <TextInput
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Salvar" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
  },
});
