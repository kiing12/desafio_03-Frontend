import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "../services/api";
import { RootStackParamList, Cat } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "List">;

export default function ListScreen({ navigation }: Props) {
  const [cats, setCats] = useState<Cat[]>([]);

  const loadCats = async () => {
    try {
      const response = await api.get("/cats");
      setCats(response.data);
    } catch (error) {
      console.log("Erro ao carregar gatos:", error);
    }
  };

  useEffect(() => {
    loadCats();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("CreateEdit", {})}
      >
        <Text style={styles.btnText}>+ Novo</Text>
      </TouchableOpacity>

      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detail", { cat: item })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.breed}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  addButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  title: { fontSize: 18, fontWeight: "600" },
});
