import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenses } from '../context/ExpensesContext';
import { getCategoryByName } from '../data/categories';

const formatoMoneda = (monto) =>
  '$' + String(monto ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function ExpenseDetailScreen({ route, navigation }) {
  const { id } = route.params || {};
  const { expenses, removeExpense } = useExpenses();

  const expense = expenses.find((item) => item.id === id);

  if (!expense) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <View style={styles.card}>
          <Text style={styles.emptyTitle}>Gasto no encontrado</Text>
          <Text style={styles.emptyText}>
            El gasto que estás buscando no existe o fue eliminado.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Volver al listado</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const categoryInfo = getCategoryByName(expense.category);

  const fechaFormateada = expense.createdAt
    ? new Date(expense.createdAt).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Sin fecha';

  const handleDelete = () => {
    Alert.alert(
      'Eliminar gasto',
      `¿Estás seguro de que querés eliminar "${expense.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            removeExpense(expense.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.navBackButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.navBackText}>← Volver a mis gastos</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.eyebrow}>DETALLE DEL GASTO</Text>
          <Text style={styles.titulo}>{expense.title}</Text>
          <Text style={styles.monto}>{formatoMoneda(expense.amount)}</Text>

          <View style={styles.divider} />

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Categoría</Text>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: (categoryInfo.color || '#7F8C8D') + '20' },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: categoryInfo.color || '#7F8C8D' },
                ]}
              >
                {categoryInfo.name || expense.category}
              </Text>
            </View>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Fecha</Text>
            <Text style={styles.fieldValue}>{fechaFormateada}</Text>
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Notas</Text>
            <Text style={styles.fieldValue}>
              {expense.notes && expense.notes.trim().length > 0
                ? expense.notes
                : 'Sin notas'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            activeOpacity={0.8}
          >
            <Text style={styles.deleteButtonText}>Eliminar gasto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 24,
  },
  navBackButton: {
    marginBottom: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  navBackText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2980B9',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  monto: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2980B9',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  fieldLabel: {
    fontSize: 15,
    color: '#7F8C8D',
  },
  fieldValue: {
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
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 24,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2C3E50',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
