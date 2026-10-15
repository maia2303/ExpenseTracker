import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function WelcomeScreen({ navigation }) {

    return(
        <View style={styles.container}>
            
            <Text style={styles.titulo}>
                Expense Tracker
            </Text>

            <Text style={styles.bienvenida}> 
                ¡Bienvenido a tus finanzas personales!
            </Text>

            <Text style = {styles.descripcion}>
                Esta aplicación te ayudará a llevar un control de tus gastos y ahorros.
            </Text>

            <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Principal')}
            accessibilityRole="button"
            >
            <Text style={styles.textoBoton}>
                Continuar
            </Text>
            </TouchableOpacity>

        </View>
    )

    

}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ocupa toda la pantalla
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center', // Centra horizontalmente
        padding: 30, // Espacio a los costados
        backgroundColor: '#F8F9FA'
    },
    titulo: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 10
    },
    bienvenida:
    {
        fontSize: 22,
        color: '#2980B9',
        marginBottom: 20,
        textAlign: 'center'
    },

    descripcion:
    {
        fontSize: 16,
        textAlign: 'center',
        color: '#7F8C8D',
        lineHeight: 24, // Espacio entre líneas
        marginBottom: 50,
    },

    boton: {
        backgroundColor: '#2980B9',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 10,
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
}
})