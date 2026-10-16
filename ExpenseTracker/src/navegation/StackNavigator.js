import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
    <Stack.Navigator
        initialRouteName="Bienvenida"
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen name="Bienvenida" component={WelcomeScreen} />
        <Stack.Screen name="Principal" component={TabNavigator} />
    </Stack.Navigator>
    );
}