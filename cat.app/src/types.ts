export type Cat = {
    id: string;
    name: string;
    breed: string;
  };
  
  export type RootStackParamList = {
    List: undefined;
    Detail: { cat: Cat };
    CreateEdit: { cat?: Cat };
  };
  