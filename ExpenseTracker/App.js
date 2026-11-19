import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { ExpensesProvider } from './src/context/ExpensesContext';

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
