
import "./global.css";
import { StatusBar } from "expo-status-bar";
import NewExpenseModal from "./src/screens/NewExpenseModal";

import  WelcomeScreen  from './src/screens/WelcomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <WelcomeScreen />
    </View>
  );
}
