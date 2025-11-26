import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "../services/api";
import { saveCat, updateCat } from "../storage/catsStorage";

type Cat = {
  id?: number;
  name: string;
  breed: string;
  description?: string;
  image?: string;
};

type RootStackParamList = {
  List: undefined;
  Single: { cat: Cat };
  CreateEdit: { cat?: Cat };
};

type Props = NativeStackScreenProps<RootStackParamList, "CreateEdit">;

export default function CreateEditScreen({ route, navigation }: Props) {
  const catEdit = route.params?.cat;

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // ✅ Se for edição, preenche os campos
  useEffect(() => {
    if (catEdit) {
      setName(catEdit.name);
      setBreed(catEdit.breed);
      setDescription(catEdit.description || "");
      setImage(catEdit.image || "");
    }
  }, [catEdit]);

  // ✅ FUNÇÃO DO BOTÃO SALVAR
  async function handleSave() {
    if (!name || !breed) {
      Alert.alert("Erro", "Nome e raça são obrigatórios.");
      return;
    }
  
    const catData = {
      id: catEdit?.id,
      name,
      breed,
      description,
      image,
    };
  
    try {
      if (catEdit?.id) {
        await updateCat(catData);
        Alert.alert("Sucesso", "Gatinho atualizado!");
      } else {
        await saveCat(catData);
        Alert.alert("Sucesso", "Gatinho salvo!");
      }
  
      navigation.navigate("List"); // ✅ volta pra Home
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar.");
    }
  }
  async function saveCat(cat: Cat) {
    await api.post("/cats", cat);
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {catEdit ? "Editar Gatinho" : "Novo Gatinho"}
      </Text>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Raça"
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
      />

      <TextInput
        placeholder="Descrição"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        placeholder="URL da imagem"
        style={styles.input}
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
