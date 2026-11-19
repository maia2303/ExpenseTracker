import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Formatea 25000 a $25.000
const formatearMonto = (monto) =>
  '$' + String(monto).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function ExpenseItem({ descripcion, monto }) {
  return (
    <View style={styles.card}>
      <Text style={styles.descripcion}>
        {descripcion}
      </Text>
      <Text style={styles.monto}>
        {formatearMonto(monto)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  descripcion: {
    flex: 1,
    paddingRight: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  monto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980B9',
  },
});