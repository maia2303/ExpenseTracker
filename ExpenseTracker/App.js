import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {
  ExpensesProvider,
  useExpenses,
} from './src/context/ExpensesContext';
import StackNavigator from './src/navigation/StackNavigator';

function AppContent() {
  const { isLoaded } = useExpenses();

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <StackNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ExpensesProvider>
      <AppContent />
    </ExpensesProvider>
  );
}

//AppContent es un componente hijo del Provider, por eso puede usar useExpenses(). Cuando isLoaded sea false, la navegación espera y muestra el indicador; cuando termine la carga, aparece la app.