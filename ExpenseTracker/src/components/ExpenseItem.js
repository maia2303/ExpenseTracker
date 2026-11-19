import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getCategoryByName } from '../data/categories';

// Formatea 25000 a $25.000
export const formatearMonto = (monto) =>
  '$' + String(monto).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function ExpenseItem({ title, amount, category, onPress }) {
  const categoryInfo = getCategoryByName(category);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.leftColumn}>
        <Text style={styles.title}>{title}</Text>
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

      <Text style={styles.amount}>{formatearMonto(amount)}</Text>
    </TouchableOpacity>
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
  leftColumn: {
    flex: 1,
    paddingRight: 12,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980B9',
  },
});
