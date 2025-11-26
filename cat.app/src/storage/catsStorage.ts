import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@cats";

export async function getCats() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveCat(cat: any) {
  const cats = await getCats();

  const newCat = {
    ...cat,
    id: Date.now(), // gera ID local
  };

  const updated = [...cats, newCat];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function updateCat(cat: any) {
  const cats = await getCats();

  const updated = cats.map((c: any) =>
    c.id === cat.id ? cat : c
  );

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteCat(id: number) {
  const cats = await getCats();

  const updated = cats.filter((c: any) => c.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
