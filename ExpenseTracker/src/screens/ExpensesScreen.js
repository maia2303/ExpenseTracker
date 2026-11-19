import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseItem from '../components/ExpenseItem';
import { useExpenses } from '../context/ExpensesContext';

export default function ExpensesScreen({ navigation }) {
  const { expenses } = useExpenses();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem
            title={item.title}
            amount={item.amount}
            category={item.category}
            onPress={() => navigation.navigate('DetalleGasto', { id: item.id })}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.titulo}>Mis gastos</Text>
            <Text style={styles.subtitulo}>
              Toca un gasto para ver su detalle.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Todavía no registraste gastos.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    padding: 24,
  },
  headerContainer: {
    marginBottom: 16,
  },
  titulo: {
    marginBottom: 4,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitulo: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  emptyText: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontSize: 16,
    marginTop: 24,
  },
});
