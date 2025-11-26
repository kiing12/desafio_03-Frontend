import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListScreen from "../screens/ListScreen";
import DetailScreen from "../screens/DetailScreen";
import CreateEditScreen from "../screens/CreateEditScreen";

export type RootStackParamList = {
  List: undefined;
  Detail: { cat: Cat };
  CreateEdit: { cat?: Cat };
};

export type Cat = {
  id: string;
  name: string;
  breed: string;
  age: number;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} options={{ title: "Cats" }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detalhes" }} />
        <Stack.Screen name="CreateEdit" component={CreateEditScreen} options={{ title: "Salvar" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
