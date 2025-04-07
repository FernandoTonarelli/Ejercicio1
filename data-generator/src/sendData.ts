// src/sendData.ts
import axios from "axios";
import faker from "faker";
import { CustomData } from "./customData";

const sendData = async () => {
  // Crear un objeto CustomData con una palabra aleatoria
  const customData: CustomData = {
    data: faker.random.word(),
  };

  try {
    console.log("Enviando datos:", customData);
    const response = await axios.post(
      "http://localhost:3005/process",
      customData
    );
    console.log("Respuesta del servidor:", response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // La solicitud se realizó y el servidor respondió con un código de estado
        // que cae fuera del rango de 2xx
        console.error("Error respuesta:", error.response.data);
        console.error("Estado:", error.response.status);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error("Error en la solicitud:", error.request);
      } else {
        // Algo causó el error
        console.error("Error mensaje:", error.message);
      }
    } else {
      // Error no relacionado con Axios
      console.error("Error:", error);
    }
  }
};

// Ejecutar una vez para la demo
sendData();

// Para enviar múltiples datos, descomentar:
/*
// Enviar 10 datos con un intervalo de 1 segundo
let count = 0;
const interval = setInterval(() => {
  sendData();
  count++;
  if (count >= 10) {
    clearInterval(interval);
  }
}, 1000);
*/
