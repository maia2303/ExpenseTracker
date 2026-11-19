import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenses } from '../context/ExpensesContext';
import { getCategoryByName } from '../data/categories';
import { formatearMonto } from '../components/ExpenseItem';

export default function ExpenseDetailScreen({ route, navigation }) {
  const { id } = route?.params || {};
  const { expenses } = useExpenses();

  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.notFoundTitle}>Gasto no encontrado</Text>
          <Text style={styles.notFoundText}>
            El gasto seleccionado no existe o fue eliminado.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Volver al listado</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const categoryInfo = getCategoryByName(expense.category);
  const formattedDate = expense.createdAt
    ? new Date(expense.createdAt).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '-';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.screenTitle}>Detalle del gasto</Text>

      <View style={styles.card}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.amount}>{formatearMonto(expense.amount)}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Categoría</Text>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: categoryInfo.color + '20' },
            ]}
          >
            <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
              {categoryInfo.name}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Fecha</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>

        <View style={styles.notesBlock}>
          <Text style={styles.label}>Notas</Text>
          <Text style={styles.notesText}>
            {expense.notes ? expense.notes : 'Sin notas adicionales'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Volver al listado</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 24,
    justifyContent: 'center',
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2980B9',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  notesBlock: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  notesText: {
    marginTop: 6,
    fontSize: 15,
    color: '#2C3E50',
    lineHeight: 22,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center',
  },
  notFoundText: {
    fontSize: 15,
    color: '#7F8C8D',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#2980B9',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
