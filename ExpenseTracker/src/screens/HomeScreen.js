import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useExpenses } from '../context/ExpensesContext';
import { formatearMonto } from '../components/ExpenseItem';

export default function HomeScreen({ navigation }) {
  const { expenses } = useExpenses();

  const totalGastos = expenses.reduce(
    (acc, item) => acc + Number(item.amount || 0),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ExpenseTracker</Text>

      <Text style={styles.bienvenida}>
        ¡Bienvenido a tus finanzas personales!
      </Text>

      <Text style={styles.descripcion}>
        Esta aplicación te ayudará a llevar un control de tus gastos y ahorros.
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>Total registrado</Text>
        <Text style={styles.summaryTotal}>{formatearMonto(totalGastos)}</Text>
        <Text style={styles.summaryCount}>
          {expenses.length === 0
            ? 'Todavía no registraste gastos'
            : `${expenses.length} ${
                expenses.length === 1 ? 'movimiento registrado' : 'movimientos registrados'
              }`}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Principal')}
        accessibilityRole="button"
      >
        <Text style={styles.textoBoton}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F8F9FA',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  bienvenida: {
    fontSize: 22,
    color: '#2980B9',
    marginBottom: 20,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7F8C8D',
    lineHeight: 24,
    marginBottom: 30,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 36,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  summaryTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  summaryCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2980B9',
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
  },
});
