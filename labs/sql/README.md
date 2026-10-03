# Laboratorio SQL — alcance preparado

Este directorio reserva el espacio para ejercicios prácticos del caso Turnify. En el MVP solo se define el punto de partida; todavía no hay motor SQL ni consultas ejecutables.

## Modelo inicial propuesto

- `cliente(id, nombre, email)`
- `vehiculo(id, cliente_id, patente, modelo)`
- `servicio(id, nombre, duracion_minutos)`
- `recurso(id, nombre, tipo)`
- `servicio_recurso(servicio_id, recurso_id)`
- `turno(id, cliente_id, vehiculo_id, servicio_id, recurso_id, inicio, fin, estado)`

## Primer ejercicio sugerido

Listar los turnos confirmados de una fecha, ordenados por hora de inicio; seleccionar solo las columnas necesarias. Más adelante se pueden sumar pistas, solución explicada, validación de resultados y reset del dataset.

## Criterios para la implementación futura

1. El motor corre en el navegador y los ejercicios usan un dataset pequeño y reiniciable.
2. Las consultas modificadoras se aíslan o limitan para proteger el estado del ejercicio.
3. La interfaz comunica carga, errores de sintaxis, resultados vacíos y tablas grandes.
4. Cada consigna se valida por el resultado esperado además de la sintaxis.
