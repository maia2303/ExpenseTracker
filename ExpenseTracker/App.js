import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ExpensesProvider } from './src/context/ExpensesContext';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <ExpensesProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <StackNavigator />
      </NavigationContainer>
    </ExpensesProvider>
  );
}
