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

const EXPENSES_COLLECTION = 'expenses';
// Sprint 3 : clave para almacenar la configuración en AsyncStorage (Capa 1)
const SETTINGS_KEY = '@expensetracker/settings';
const ExpensesContext = createContext(null);

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

    const unsubscribe = onSnapshot(
      expensesQuery,
      (snapshot) => {
        const loadedExpenses = snapshot.docs.map((snapshotDoc) => {
          const data = snapshotDoc.data({ serverTimestamps: 'estimate' });
          const createdAt = data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : typeof data.createdAt === 'string'
              ? data.createdAt
              : null;

          return {
            id: snapshotDoc.id,
            title: data.title ?? '',
            amount: Number(data.amount ?? 0),
            category: data.category ?? 'Otros',
            notes: data.notes ?? '',
            createdAt,
            hasPendingWrites: snapshotDoc.metadata.hasPendingWrites,
          };
        });

        setExpenses(loadedExpenses);
        setIsLoaded(true);
      },
      (error) => {
        console.error('Error al escuchar los gastos en Firestore:', error);
        setIsLoaded(true);
      }
    );

    return () => unsubscribe();
  }, []);


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
