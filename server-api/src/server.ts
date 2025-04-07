import express, { Express, Request, Response } from "express";
import { CustomData } from "./data-structure/CustomData";
import { Pipeline } from "./pipeline/Pipeline";
import { QueueFactory } from "./pipeline/QueueFactory";
import * as filters from "./filters/filters";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

const app: Express = express();
const port: number = 3005;

// Middleware para procesar JSON
app.use(express.json());

// Función simple para validar el formato de CustomData
const isValidCustomData = (data: any): boolean => {
  return data && typeof data.data === "string" && data.data.length > 0;
};

// Ruta para procesar datos con el pipeline
app.post("/process", (req: Request, res: Response) => {
  console.log("Datos recibidos:", req.body);

  // Validar formato de datos
  if (!isValidCustomData(req.body)) {
    return res.status(400).send({
      message: "Formato de datos inválido",
      expected: { data: "string" },
    });
  }

  // Crear pipeline con los filtros
  const pipeline = new Pipeline<CustomData>(
    [
      filters.toLowercaseWithSpaces,
      filters.filterWithRandomError,
      filters.toUppercase,
      filters.replaceSpacesWithDots,
    ],
    QueueFactory.getQueueFactory
  );

  // Registrar eventos del pipeline
  pipeline.on("errorInFilter", (err, data) => {
    console.error(`Error en el pipeline: ${err.message}`, data);
  });

  pipeline.on("finalOutput", (data) => {
    console.log("Procesamiento completado:", data);
  });

  try {
    // Iniciar procesamiento (fire & forget)
    pipeline.processInput(req.body as CustomData);

    // Responder con éxito, sin esperar que termine el procesamiento
    res.status(200).send({
      message: "Datos recibidos correctamente y enviados a procesar",
      status: "processing",
    });
  } catch (error) {
    console.error("Error al iniciar el procesamiento:", error);
    res.status(500).send({
      message: "Error interno al procesar la solicitud",
    });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor API escuchando en http://localhost:${port}`);
});
