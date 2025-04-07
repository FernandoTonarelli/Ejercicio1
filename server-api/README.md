## Repositorio 2: Server API

# Server API con Pipes and Filters

Servidor que implementa el patrón arquitectónico Pipes and Filters para procesar datos recibidos por HTTP.

## Instalación

1. Clonar este repositorio
2. Instalar dependencias:
```bash
npm i
```
3. Iniciar servicios de Redis y RabbitMQ con Docker:
```bash
docker-compose up -d
```

## Uso

Iniciar el servidor:
```bash
npm start
```

El servidor escuchará en http://localhost:3005/process y procesará los datos recibidos a través del pipeline.

## Estructura

- `src/server.ts`: Servidor Express que recibe peticiones
- `src/data-structure/`: Contiene la definición de estructuras de datos
- `src/filters/`: Contiene los filtros que procesan los datos
- `src/pipeline/`: Implementación del patrón Pipes and Filters
- `src/queues-providers/`: Adaptadores para diferentes tecnologías de colas

## Solución de problemas registrados

- Problema con docker:

    1. Ir a *Docker Desktop*, eliminar *server-api*.
    2. Volver a ejecutar:
    ```bash
    docker-compose up -d
    ```