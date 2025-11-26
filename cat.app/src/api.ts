import axios from "axios";

const API_BASE = "http://10.0.2.2:3333/api"; 
// se usar em emulador Android Studio: 10.0.2.2
// se for iOS simulator: use http://localhost:3333/api
// em dispositivo físico, use IP da sua máquina: http://192.168.x.x:3333/api

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});
