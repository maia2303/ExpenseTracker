import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sprint 3 : clave para almacenar los gastos en AsyncStorage
const EXPENSES_KEY = '@expensetracker/expenses';
// Sprint 3 : clave para almacenar la configuración en AsyncStorage
const SETTINGS_KEY = '@expensetracker/settings';
const ExpensesContext = createContext(null);

const DEFAULT_SETTINGS = {
  notificationsEnabled: false,
  darkModeEnabled: false,
};

// Sprint 3 : validaciones para no confiar ciegamente en lo que hay en AsyncStorage
const isValidExpenses = (data) =>
  Array.isArray(data) &&
  data.every(
    (expense) =>
      expense &&
      typeof expense.id === 'string' &&
      typeof expense.title === 'string' &&
      typeof expense.amount === 'number'
  );

const isValidSettings = (data) =>
  data !== null &&
  typeof data === 'object' &&
  typeof data.notificationsEnabled === 'boolean' &&
  typeof data.darkModeEnabled === 'boolean';

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [canPersistSettings, setCanPersistSettings] = useState(false);

  // Sprint 3 (US #5): Escuchar la colección de gastos en tiempo real desde Cloud Firestore
  useEffect(() => {
    const expensesQuery = query(
      collection(db, EXPENSES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

  const hydrateExpenses = async () => {
    let storedExpenses;

    try {
      storedExpenses = await AsyncStorage.getItem(EXPENSES_KEY);
    } catch (error) {
      // Falló el acceso al almacenamiento: NO habilitamos el guardado (canPersist
      // queda en false) para no pisar datos que podrían existir.
      console.error('Error al leer los gastos:', error);
      if (isMounted) {
        setIsLoaded(true);
      }
      return;
    }

    let loadedExpenses = [];

    try {
      if (storedExpenses !== null) {
        const parsedExpenses = JSON.parse(storedExpenses);

        if (!isValidExpenses(parsedExpenses)) {
          throw new Error('Los gastos guardados no tienen un formato válido.');
        }

        loadedExpenses = parsedExpenses;
      }
    } catch (error) {
      // JSON dañado: la app arranca con la lista vacía en lugar de romperse.
      // Se puede volver a guardar, y el próximo guardado reemplaza el contenido dañado.
      console.error('Gastos guardados dañados, se inicia con lista vacía:', error);
    }

    if (isMounted) {
      setExpenses(loadedExpenses);
      setCanPersist(true);
      setIsLoaded(true);
    }
  };

  hydrateExpenses();

  return () => {
    isMounted = false;
  };
}, []);

useEffect(() => {
  if (!isLoaded || !canPersist) {
    return;
  }

  const persistExpenses = async () => {
    try {
      await AsyncStorage.setItem(
        EXPENSES_KEY,
        JSON.stringify(expenses)
      );
    } catch (error) {
      console.error('Error al guardar los gastos:', error);
    }
  };

    return () => unsubscribe();
  }, []);


// Sprint 3 : Guardar los ajustes en AsyncStorage cada vez que cambien

useEffect(() => {
  let isMounted = true;

  const hydrateSettings = async () => {
    let storedSettings;

    try {
      storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    } catch (error) {
      console.error('Error al leer los ajustes:', error);
      if (isMounted) {
        setSettingsLoaded(true);
      }
      return;
    }

    let loadedSettings = DEFAULT_SETTINGS;

    try {
      if (storedSettings !== null) {
        const parsedSettings = JSON.parse(storedSettings);

        if (!isValidSettings(parsedSettings)) {
          throw new Error('Los ajustes guardados no tienen un formato válido.');
        }

        loadedSettings = parsedSettings;
      }
    } catch (error) {
      console.error('Ajustes guardados dañados, se usan los valores por defecto:', error);
    }

    if (isMounted) {
      setNotificationsEnabled(loadedSettings.notificationsEnabled);
      setDarkModeEnabled(loadedSettings.darkModeEnabled);
      setCanPersistSettings(true);
      setSettingsLoaded(true);
    }
  };

  hydrateSettings();

  return () => {
    isMounted = false;
  };
}, []);

useEffect(() => {
  if (!settingsLoaded || !canPersistSettings) {
    return;
  }

  const persistSettings = async () => {
    try {
      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({ notificationsEnabled, darkModeEnabled })
      );
    } catch (error) {
      console.error('Error al guardar los ajustes:', error);
    }
  };

  persistSettings();
}, [
  notificationsEnabled,
  darkModeEnabled,
  settingsLoaded,
  canPersistSettings,
]);

  const addExpense = (data) => {
    const newExpense = {
      title: String(data.title || '').trim(),
      amount: Number(data.amount),
      category: data.category || 'Otros',
      notes: String(data.notes || '').trim(),
      createdAt: serverTimestamp(),
    };

    addDoc(collection(db, EXPENSES_COLLECTION), newExpense).catch((error) => {
      console.error('Error al guardar el gasto en Firestore:', error);
    });
  };

  const removeExpense = (id) => {
    deleteDoc(doc(db, EXPENSES_COLLECTION, id)).catch((error) => {
      console.error('Error al eliminar el gasto en Firestore:', error);
    });
  };

  return (
    <ExpensesContext.Provider
      value={{
        notificationsEnabled,
        setNotificationsEnabled,
        darkModeEnabled,
        setDarkModeEnabled,
        settingsLoaded,
        expenses,
        isLoaded,
        addExpense,
        removeExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses debe utilizarse dentro de un ExpensesProvider');
  }
  return context;
}