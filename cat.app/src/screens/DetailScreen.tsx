import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { api } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function DetailScreen({ route, navigation }: Props) {
  const { cat } = route.params;

  const remove = async () => {
    await api.delete(`/cats/${cat.id}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cat.name}</Text>
      <Text>Raça: {cat.breed}</Text>
      <Text>Idade: {cat.age}</Text>

      <TouchableOpacity
        style={styles.edit}
        onPress={() => navigation.navigate("CreateEdit", { cat })}
      >
        <Text style={styles.btnText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.delete} onPress={remove}>
        <Text style={styles.btnText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  edit: { backgroundColor: "#0095ff", padding: 12, borderRadius: 6, marginTop: 20 },
  delete: { backgroundColor: "red", padding: 12, borderRadius: 6, marginTop: 10 },
  btnText: { color: "#fff", textAlign: "center" },
});
    