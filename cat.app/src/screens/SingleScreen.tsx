import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, Cat } from "../navigation"; // ajuste se seu path for diferente
import { api } from "../services/api";

type Props = NativeStackScreenProps<RootStackParamList, "Detail" | "CreateEdit">;

export default function SingleScreen({ route, navigation }: Props) {
  // route.params pode vir como { cat } (quando chamado via Detail) ou undefined (quando criar)
  const passedCat = (route.params as any)?.cat as Cat | undefined;

  const [cat, setCat] = useState<Partial<Cat>>(
    passedCat ? { ...passedCat } : { name: "", breed: "", age: 0, id: "" }
  );
  const [loading, setLoading] = useState(false); // para chamadas API
  const [mode, setMode] = useState<"view" | "edit" | "create">(passedCat ? "view" : "create");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // se a tela for aberta via Detail mas sem dados completos (apenas id), poderia buscar aqui.
    // Exemplo: if (passedCat?.id && !passedCat.name) { fetchCat(passedCat.id) }
  }, []);

  const validate = () => {
    if (!cat.name || String(cat.name).trim().length < 2) {
      Alert.alert("Validação", "Nome precisa ter ao menos 2 caracteres.");
      return false;
    }
    if (!cat.breed || String(cat.breed).trim().length < 2) {
      Alert.alert("Validação", "Digite a raça.");
      return false;
    }
    if (!cat.age && cat.age !== 0) {
      Alert.alert("Validação", "Informe a idade.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);

    try {
      if (mode === "create") {
        const body = { name: cat.name, breed: cat.breed, age: Number(cat.age) };
        const res = await api.post("/cats", body);
        // opcional: navegar pra detail do novo criado
        navigation.navigate("Detail", { cat: res.data });
      } else {
        // edit mode: PUT
        const id = cat.id;
        await api.put(`/cats/${id}`, { name: cat.name, breed: cat.breed, age: Number(cat.age) });
        // atualizar estado e voltar pra view
        setMode("view");
        // opcional: atualizar rota com dados novos
        navigation.setParams({ cat: { ...(cat as Cat) } });
      }
    } catch (err) {
      console.log("Erro ao salvar:", err);
      Alert.alert("Erro", "Falha ao salvar. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!cat?.id) return;
    Alert.alert("Confirmar", "Deseja excluir este gato?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            await api.delete(`/cats/${cat.id}`);
            navigation.navigate("List");
          } catch (err) {
            console.log("Erro ao deletar:", err);
            Alert.alert("Erro", "Não foi possível excluir.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  // Render UI
  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={s.container}>
        {/* Image placeholder */}
        <View style={s.imageWrap}>
          {cat?.age ? (
            <Image source={{ uri: cat.age }} style={s.image} resizeMode="cover" />
          ) : (
            <View style={s.placeholder}>
              <Text style={s.placeholderText}>Sem imagem</Text>
            </View>
          )}
        </View>

        {/* Fields */}
        <View style={s.field}>
          <Text style={s.label}>Nome</Text>
          {mode === "view" ? (
            <Text style={s.value}>{cat?.name}</Text>
          ) : (
            <TextInput
              style={s.input}
              value={String(cat?.name ?? "")}
              onChangeText={(t) => setCat((p) => ({ ...p, name: t }))}
              placeholder="Nome do gato"
            />
          )}
        </View>

        <View style={s.field}>
          <Text style={s.label}>Raça</Text>
          {mode === "view" ? (
            <Text style={s.value}>{cat?.breed}</Text>
          ) : (
            <TextInput
              style={s.input}
              value={String(cat?.breed ?? "")}
              onChangeText={(t) => setCat((p) => ({ ...p, breed: t }))}
              placeholder="Raça"
            />
          )}
        </View>

        <View style={s.field}>
          <Text style={s.label}>Idade</Text>
          {mode === "view" ? (
            <Text style={s.value}>{cat?.age ?? "-"}</Text>
          ) : (
            <TextInput
              style={s.input}
              value={cat?.age !== undefined ? String(cat.age) : ""}
              onChangeText={(t) => setCat((p) => ({ ...p, age: Number(t) }))}
              placeholder="Idade"
              keyboardType="numeric"
            />
          )}
        </View>

        {/* Buttons */}
        <View style={s.buttons}>
          {mode === "view" ? (
            <>
              <TouchableOpacity style={s.primary} onPress={() => setMode("edit")}>
                <Text style={s.primaryText}>Editar</Text>
              </TouchableOpacity>

              {cat?.id ? (
                <TouchableOpacity style={s.ghost} onPress={handleDelete}>
                  <Text style={s.ghostText}>Excluir</Text>
                </TouchableOpacity>
              ) : null}
            </>
          ) : (
            <>
              <TouchableOpacity style={[s.primary, saving && s.disabled]} onPress={handleSave} disabled={saving}>
                {saving ? <ActivityIndicator color="#fff" /> : <Text style={s.primaryText}>Salvar</Text>}
              </TouchableOpacity>

              <TouchableOpacity
                style={s.ghost}
                onPress={() => {
                  if (passedCat) setMode("view");
                  else navigation.navigate("List");
                }}
              >
                <Text style={s.ghostText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    padding: 18,
    paddingBottom: 40,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageWrap: {
    height: 220,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: "100%" },
  placeholder: { justifyContent: "center", alignItems: "center", flex: 1 },
  placeholderText: { color: "#888" },
  field: { marginBottom: 12 },
  label: { color: "#555", marginBottom: 6, fontWeight: "600" },
  value: { fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttons: { marginTop: 18, flexDirection: "row", justifyContent: "space-between" },
  primary: {
    flex: 1,
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },
  primaryText: { color: "#fff", fontWeight: "700" },
  ghost: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  ghostText: { color: "#333" },
  disabled: { opacity: 0.6 },
});
