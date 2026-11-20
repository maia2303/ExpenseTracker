import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenses } from '../context/ExpensesContext';

const formatoMoneda = (monto) =>
  '$' + String(monto ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function HomeScreen({ navigation }) {
  const { expenses } = useExpenses();

  const totalGastos = expenses.reduce(
    (total, gasto) => total + Number(gasto.amount ?? 0),
    0
  );

  const hayGastos = expenses.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>ExpenseTracker</Text>

        <Text style={styles.bienvenida}>
          ¡Bienvenido a tus finanzas personales!
        </Text>

        <Text style={styles.descripcion}>
          Esta aplicación te ayudará a llevar un control de tus gastos y ahorros.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL REGISTRADO</Text>
          <Text style={styles.summaryTotal}>{formatoMoneda(totalGastos)}</Text>

          <View style={styles.summaryDivider} />

          {hayGastos ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryMovementsLabel}>
                Movimientos registrados
              </Text>
              <Text style={styles.summaryMovementsCount}>{expenses.length}</Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>
              Todavía no registraste gastos.
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.boton}
          onPress={() => navigation.navigate('Principal')}
          accessibilityRole="button"
          activeOpacity={0.8}
        >
          <Text style={styles.textoBoton}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  bienvenida: {
    fontSize: 20,
    color: '#2980B9',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 15,
    textAlign: 'center',
    color: '#7F8C8D',
    lineHeight: 22,
    marginBottom: 28,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#7F8C8D',
    marginBottom: 6,
  },
  summaryTotal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryMovementsLabel: {
    fontSize: 15,
    color: '#7F8C8D',
  },
  summaryMovementsCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  emptyText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 4,
  },
  boton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#2980B9',
    paddingVertical: 16,
    borderRadius: 12,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
