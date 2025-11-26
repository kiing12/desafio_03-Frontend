import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

// ✅ Tipagem da screen
type Props = NativeStackScreenProps<RootStackParamList, "Single">;

// ✅ Modelo do gato (ajuste se teu backend mudar)
type Cat = {
  id: number;
  name: string;
  breed: string;
  description?: string;
  image?: string;
};

export default function SingleScreen({ route, navigation }: Props) {
  const { cat } = route.params as { cat: Cat };

  // ✅ Tratamento correto da imagem (sem erro do TS)
  const imageSource =
    typeof cat?.image === "string" && cat.image.trim() !== ""
      ? { uri: cat.image }
      : require("../../assets/placeholder.png"); // deixa um placeholder no assets

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{cat.name}</Text>

      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      <View style={styles.infoBox}>
        <Text style={styles.label}>Raça:</Text>
        <Text style={styles.value}>{cat.breed}</Text>

        {cat.description && (
          <>
            <Text style={[styles.label, { marginTop: 16 }]}>Descrição:</Text>
            <Text style={styles.value}>{cat.description}</Text>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate("CreateEdit", { cat })}
      >
        <Text style={styles.buttonText}>Editar Gato</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ✅ Estilos organizados
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#eee",
  },
  infoBox: {
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    alignItems: "center",
  },
  backText: {
    color: "#555",
    fontSize: 15,
  },
});
