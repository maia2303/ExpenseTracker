import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExpenseDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalle del gasto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
});
