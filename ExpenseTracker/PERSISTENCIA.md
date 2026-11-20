# Persistencia local

La app utiliza AsyncStorage para conservar los gastos y los ajustes entre aperturas.

## Claves

- `@expensetracker/expenses`: lista de gastos, serializada con JSON.
- `@expensetracker/settings`: valores de notificaciones y modo oscuro, serializados con JSON.

## Hidratación y guardado

Al iniciar, el Provider lee AsyncStorage y convierte el JSON con `JSON.parse`. El guardado de gastos espera a que `isLoaded` sea `true`, para no guardar el arreglo vacío inicial antes de terminar la lectura. Los ajustes también esperan a completar su propia hidratación.

Las operaciones de lectura y escritura esperan (`await`) a AsyncStorage y manejan errores con `try/catch`.

## Pruebas manuales

- Agregué un gasto, cerré completamente la app y volví a abrirla en Expo Go. El gasto siguió apareciendo.
- Cambié los Switches de notificaciones y modo oscuro, cerré la app y la abrí nuevamente. Ambos conservaron su valor.

## Prueba del guard de hidratación

Para probar el problema sin arriesgar los gastos reales, usé temporalmente la clave `@expensetracker/expenses-race-test`. Primero ejecuté la app con el guard de `isLoaded`; luego quité el guard y retrasé la lectura dos segundos. Al iniciar, el efecto de guardado escribió el arreglo vacío antes de leer los datos y el listado de prueba quedó vacío.

Después restauré la clave real, el guard y quité la espera temporal. La prueba muestra que el guard evita que el guardado se adelante a la hidratación.