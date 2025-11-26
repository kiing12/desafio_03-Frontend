export type Cat = {
  id: number;
  name: string;
  breed: string;
  description?: string;
  image?: string;
};

export type RootStackParamList = {
  List: undefined;
  Single: { cat: Cat };
  CreateEdit: { cat?: Cat };
};
//     flexGrow: 1,