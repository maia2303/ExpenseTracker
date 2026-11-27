# Persistencia local

La app utiliza AsyncStorage para conservar los gastos y los ajustes entre aperturas.

## Claves

- `@expensetracker/expenses`: lista de gastos, serializada con JSON.
- `@expensetracker/settings`: valores de notificaciones y modo oscuro, serializados con JSON.

## Hidratación y guardado

Al iniciar, el Provider lee AsyncStorage y convierte el JSON con `JSON.parse`. El guardado de gastos espera a que `isLoaded` sea `true`, para no guardar el arreglo vacío inicial antes de terminar la lectura. Los ajustes también esperan a completar su propia hidratación.

Las operaciones de lectura y escritura esperan (`await`) a AsyncStorage y manejan errores con `try/catch`.
-
## Pruebas manuales

- Agregué un gasto, cerré completamente la app y volví a abrirla en Expo Go. El gasto siguió apareciendo.
- Cambié los Switches de notificaciones y modo oscuro, cerré la app y la abrí nuevamente. Ambos conservaron su valor.

## Prueba del guard de hidratación

Para probar el problema sin arriesgar los gastos reales, usé temporalmente la clave `@expensetracker/expenses-race-test`. Primero ejecuté la app con el guard de `isLoaded`; luego quité el guard y retrasé la lectura dos segundos. Al iniciar, el efecto de guardado escribió el arreglo vacío antes de leer los datos y el listado de prueba quedó vacío.

Después restauré la clave real, el guard y quité la espera temporal. La prueba muestra que el guard evita que el guardado se adelante a la hidratación.

## Sin datos guardados

Si no hay nada guardado (primera ejecución), la app arranca con la lista de gastos vacía y muestra el estado vacío del listado. Los datos de ejemplo (`INITIAL_EXPENSES`) ya no son la fuente de datos, igual que en la PWA.

## JSON dañado y fallo de lectura

La hidratación distingue dos situaciones:

- **El contenido guardado está dañado o tiene un formato inválido** (`JSON.parse` falla o no pasa `isValidExpenses` / `isValidSettings`): la app no se rompe, arranca con la lista vacía (o los ajustes por defecto) y se habilita el guardado, de modo que el próximo guardado reemplaza el contenido dañado.
- **Falla el acceso a AsyncStorage** (`getItem` lanza un error): `canPersist` queda en `false` y no se guarda nada en esa sesión, para no pisar datos que podrían existir.

## Por qué hace falta `isLoaded` en React Native y en la PWA no

`AsyncStorage` es asíncrono: `getItem` devuelve una promesa, así que el primer render ocurre antes de tener los datos. Por eso se hidrata en un `useEffect` de montaje, se muestra un `ActivityIndicator` mientras `isLoaded` es `false` y se bloquea el guardado hasta terminar la lectura. En la PWA, `localStorage` es síncrono y se lee directamente en el valor inicial del `useState`, así que `isLoaded` vale `true` desde el primer render.


