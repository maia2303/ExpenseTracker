import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../services/firebase';

// Los gastos viven en Firestore; los ajustes siguen en AsyncStorage (Capa 1)
const EXPENSES_COLLECTION = 'expenses';
const SETTINGS_KEY = '@expensetracker/settings';

const ExpensesContext = createContext(null);

const DEFAULT_SETTINGS = {
  notificationsEnabled: false,
  darkModeEnabled: false,
};

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

  // US #5: escuchar la colección de gastos en tiempo real desde Firestore
  useEffect(() => {
    const expensesQuery = query(
      collection(db, EXPENSES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      expensesQuery,
      (snapshot) => {
        const list = snapshot.docs.map((document) => {
          // 'estimate' evita que createdAt sea null mientras la escritura está pendiente
          const data = document.data({ serverTimestamps: 'estimate' });
          return {
            id: document.id,
            title: data.title,
            amount: data.amount,
            category: data.category,
            notes: data.notes,
            createdAt: data.createdAt?.toDate
              ? data.createdAt.toDate().toISOString()
              : null,
            // Para la US #6: true si el gasto todavía no se sincronizó con el servidor
            hasPendingWrites: document.metadata.hasPendingWrites,
          };
        });

        setExpenses(list);
        setIsLoaded(true); // el primer snapshot marca que los datos ya están disponibles
      },
      (error) => {
        console.error('Error al escuchar los gastos en Firestore:', error);
        setIsLoaded(true);
      }
    );

    return () => unsubscribe();
  }, []);

  // Ajustes: hidratación desde AsyncStorage
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

  // Ajustes: guardado cada vez que cambian (solo después de hidratar)
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
  }, [notificationsEnabled, darkModeEnabled, settingsLoaded, canPersistSettings]);

  // Sin await a propósito: sin conexión la promesa no se resuelve hasta que el
  // servidor confirma, y onSnapshot ya muestra el gasto al instante (Optimistic UI)
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