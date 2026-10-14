
import "./global.css";
import { StatusBar } from "expo-status-bar";
import NewExpenseModal from "./src/screens/NewExpenseModal";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NewExpenseModal />
    </>
  );
}
