import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExpensesScreen from '../screens/ExpensesScreen';
import NewExpenseModal from '../screens/NewExpenseModal';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Gastos" component={ExpensesScreen} />
    <Tab.Screen name="Nuevo gasto" component={NewExpenseModal} />
    </Tab.Navigator>
    );
}