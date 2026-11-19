# ExpenseTracker - Sprint 1

Prototipo inicial navegable de **ExpenseTracker**, una aplicación móvil construida con **React Native** y **Expo** para el registro y consulta de gastos personales.

## Estructura del Proyecto

```text
src/
├── components/
│   └── ExpenseItem.js
├── screens/
│   ├── HomeScreen.js
│   ├── ExpensesScreen.js
│   ├── ExpenseDetailScreen.js
│   ├── SettingsScreen.js
│   └── NewExpenseModal.js
├── navigation/
│   ├── TabNavigator.js
│   └── StackNavigator.js
└── assets/
```

## Cómo ejecutar el proyecto

1. Instalar las dependencias dentro de la carpeta `ExpenseTracker`:
   ```bash
   cd ExpenseTracker
   npm install
   ```
2. Iniciar el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```
3. Escanear el código QR desde la aplicación **Expo Go** en Android o iOS.

## Capturas de pantalla en Expo Go

> *(Adjuntar aquí las capturas de pantalla de la aplicación funcionando en Expo Go)*

- **Pantalla de Bienvenida (`HomeScreen`)**
- **Listado de Gastos (`ExpensesScreen`)**
- **Formulario de Nuevo Gasto (`NewExpenseModal`)**
