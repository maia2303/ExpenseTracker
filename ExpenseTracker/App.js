
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navegation/StackNavigator';
export default function App() {
  
  return (
  <NavigationContainer>
    <StatusBar style="auto" />
    <StackNavigator />
  </NavigationContainer>
);
}
