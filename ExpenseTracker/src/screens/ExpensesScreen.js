import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpenseItem from '../components/ExpenseItem';

// Datos definidos manualmente (el Sprint 1 no usa persistencia)
const GASTOS = [
  { id: '1', descripcion: 'Supermercado', monto: 25000 },
  { id: '2', descripcion: 'Combustible', monto: 18000 },
  { id: '3', descripcion: 'Internet', monto: 32000 },
];

export default function ExpensesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <FlatList
        data={GASTOS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem descripcion={item.descripcion} monto={item.monto} />
        )}
        contentContainerStyle={{ padding: 24 }}
        ListHeaderComponent={
          <View className="mb-4">
            <Text className="mb-1 text-3xl font-bold text-gray-800">
              Mis gastos
            </Text>
            <Text className="text-base text-gray-500">
              Estos son tus gastos registrados.
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center text-gray-500">
            Todavía no hay gastos cargados.
          </Text>
        }
      />
    </SafeAreaView>
  );
}