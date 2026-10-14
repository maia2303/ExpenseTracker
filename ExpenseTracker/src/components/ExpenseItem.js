import React from 'react';
import { View, Text } from 'react-native';

//Formatea 25000 a $25.000
const formatearMonto = (monto) =>
  '$' + String(monto).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function ExpenseItem({ descripcion, monto }) {
  return (
    <View className="mb-3 flex-row items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
      <Text className="flex-1 pr-3 text-base font-semibold text-gray-800">
        {descripcion}
      </Text>
      <Text className="text-base font-bold text-blue-600">
        {formatearMonto(monto)}
      </Text>
    </View>
  );
}