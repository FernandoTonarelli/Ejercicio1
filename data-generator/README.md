## Repositorio 1: Data Generator

# Data Generator

Cliente simple que genera y envía datos al servidor para la prueba de Pipes and Filters.

## Instalación

1. Clonar este repositorio
2. Instalar dependencias:

```bash
npm i
```

## Uso

Ejecutar el generador de datos (1ro debería estar levantado el otro repo):

```bash
npm start
```

Esto enviará datos al servidor en http://localhost:3005/process.

## Estructura

- `src/customData.ts`: Define la estructura de datos
- `src/sendData.ts`: Genera y envía datos al servidor

## Solución de problemas registrados

- Problema con `"faker"`:

```bash
    npm uninstall @types/faker
    npm install --save-dev @types/faker@5.5.9
```
