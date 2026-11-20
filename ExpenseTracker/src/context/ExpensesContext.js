import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_EXPENSES = [
  
  {
    id: '1',
    title: 'Supermercado',
    amount: 25000,
    category: 'Alimentación',
    notes: 'Compra semanal',
    createdAt: '2026-11-15T10:30:00.000Z',
  },
  {
    id: '2',
    title: 'Combustible',
    amount: 18000,
    category: 'Transporte',
    notes: 'Carga de nafta',
    createdAt: '2026-11-16T14:15:00.000Z',
  },
  {
    id: '3',
    title: 'Internet',
    amount: 32000,
    category: 'Servicios',
    notes: 'Factura mensual fibra óptica',
    createdAt: '2026-11-17T09:00:00.000Z',
  },
];
// Sprint 3 : clave para almacenar los gastos en AsyncStorage
const EXPENSES_KEY = '@expensetracker/expenses';
// Sprint 3 : clave para almacenar la configuración en AsyncStorage
const SETTINGS_KEY = '@expensetracker/settings';
const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  // Sprint 3 : Cargar los gastos desde AsyncStorage al iniciar la aplicación
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canPersist, setCanPersist] = useState(false); //canPersist sirve para no sobrescribir datos si falla la lectura de AsyncStorage.
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [canPersistSettings, setCanPersistSettings] = useState(false);
// Sprint 3 : Guardar los gastos en AsyncStorage cada vez que cambien
  useEffect(() => {
  let isMounted = true;

  const hydrateExpenses = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const storedExpenses = await AsyncStorage.getItem(EXPENSES_KEY);
      const loadedExpenses =
        storedExpenses === null
          ? INITIAL_EXPENSES
          : JSON.parse(storedExpenses);

      if (!Array.isArray(loadedExpenses)) {
        throw new Error('Los gastos guardados no tienen un formato válido.');
      }

      if (isMounted) {
        setExpenses(loadedExpenses);
        setCanPersist(true);
      }
    } catch (error) {
      console.error('Error al cargar los gastos:', error);
    } finally {
      if (isMounted) {
        setIsLoaded(true);
      }
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

  persistExpenses();
}, [expenses, isLoaded, canPersist]);


// Sprint 3 : Guardar los ajustes en AsyncStorage cada vez que cambien

useEffect(() => {
  let isMounted = true;

  const hydrateSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
      let loadedSettings = {
        notificationsEnabled: false,
        darkModeEnabled: false,
      };

      if (storedSettings !== null) {
        const parsedSettings = JSON.parse(storedSettings);

        if (
          typeof parsedSettings?.notificationsEnabled !== 'boolean' ||
          typeof parsedSettings?.darkModeEnabled !== 'boolean'
        ) {
          throw new Error('Los ajustes guardados no tienen un formato válido.');
        }

        loadedSettings = parsedSettings;
      }

      if (isMounted) {
        setNotificationsEnabled(loadedSettings.notificationsEnabled);
        setDarkModeEnabled(loadedSettings.darkModeEnabled);
        setCanPersistSettings(true);
      }
    } catch (error) {
      console.error('Error al cargar los ajustes:', error);
    } finally {
      if (isMounted) {
        setSettingsLoaded(true);
      }
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
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      title: String(data.title || '').trim(),
      amount: Number(data.amount),
      category: data.category || 'Otros',
      notes: String(data.notes || '').trim(),
      createdAt: new Date().toISOString(),
    };

    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    return newExpense;
  };

  const removeExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
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
