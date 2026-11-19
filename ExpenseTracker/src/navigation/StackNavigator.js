import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import TabNavigator from './TabNavigator';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Bienvenida"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Bienvenida" component={HomeScreen} />
      <Stack.Screen name="Principal" component={TabNavigator} />
      <Stack.Screen name="DetalleGasto" component={ExpenseDetailScreen} />
    </Stack.Navigator>
  );
}
