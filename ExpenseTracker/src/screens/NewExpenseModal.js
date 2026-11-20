import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExpenses } from '../context/ExpensesContext';
import { CATEGORIES } from '../data/categories';

export default function NewExpenseModal({ navigation }) {
  const { addExpense } = useExpenses();

  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIES[0].name);
  const [notas, setNotas] = useState('');

  const guardarGasto = () => {
    const nombreLimpio = nombre.trim();
    const montoLimpio = monto.trim().replace(',', '.');

    if (!nombreLimpio) {
      Alert.alert('Campo incompleto', 'Por favor, ingresa el nombre del gasto.');
      return;
    }

    if (!montoLimpio) {
      Alert.alert('Campo incompleto', 'Por favor, ingresa el monto del gasto.');
      return;
    }

    const montoNumerico = Number(montoLimpio);

    if (!Number.isFinite(montoNumerico) || montoNumerico <= 0) {
      Alert.alert('Monto inválido', 'El monto debe ser un número mayor a cero.');
      return;
    }

    if (!categoria.trim()) {
      Alert.alert('Campo incompleto', 'Por favor, selecciona una categoría.');
      return;
    }

    addExpense({
      title: nombreLimpio,
      amount: montoNumerico,
      category: categoria.trim(),
      notes: notas.trim(),
    });

    setNombre('');
    setMonto('');
    setNotas('');
    setCategoria(CATEGORIES[0].name);

    if (navigation?.navigate) {
      navigation.navigate('Gastos');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.titulo}>Nuevo gasto</Text>
          <Text style={styles.subtitulo}>Completa los datos de tu gasto.</Text>

          <Text style={styles.label}>Nombre del gasto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Supermercado"
            placeholderTextColor="#9CA3AF"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Monto *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 25000"
            placeholderTextColor="#9CA3AF"
            value={monto}
            onChangeText={setMonto}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Categoría *</Text>
          <View style={styles.categoriesContainer}>
            {CATEGORIES.map((cat) => {
              const isSelected = categoria === cat.name;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryChip,
                    isSelected && {
                      backgroundColor: cat.color,
                      borderColor: cat.color,
                    },
                  ]}
                  onPress={() => setCategoria(cat.name)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isSelected && styles.categoryChipTextSelected,
                    ]}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.label}>Notas (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ej. Compra semanal de verduras"
            placeholderTextColor="#9CA3AF"
            value={notas}
            onChangeText={setNotas}
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity
            style={styles.boton}
            onPress={guardarGasto}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBoton}>Guardar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  titulo: {
    marginBottom: 6,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitulo: {
    marginBottom: 20,
    fontSize: 15,
    color: '#7F8C8D',
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50',
  },
  input: {
    marginBottom: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    padding: 14,
    fontSize: 16,
    color: '#2C3E50',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 18,
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '500',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  boton: {
    marginTop: 8,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#2980B9',
    padding: 16,
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
