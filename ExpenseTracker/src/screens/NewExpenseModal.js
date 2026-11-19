import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

export default function NewExpenseModal() {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');

  const guardarGasto = () => {
    if (!nombre.trim() || !monto.trim() || !categoria.trim()) {
      Alert.alert(
        'Campos incompletos',
        'Por favor, completa todos los campos.'
      );
      return;
    }

    if (
      isNaN(Number(monto.replace(',', '.'))) ||
      Number(monto.replace(',', '.')) <= 0
    ) {
      Alert.alert('Monto inválido', 'Ingresa un monto mayor que cero.');
      return;
    }

    console.log('Gasto ingresado:', {
      nombre,
      monto,
      categoria,
    });

    Alert.alert(
      '¡Listo!',
      `Gasto: ${nombre}\nMonto: $${monto}\nCategoría: ${categoria}`
    );

    setNombre('');
    setMonto('');
    setCategoria('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Nuevo gasto
      </Text>

      <Text style={styles.subtitulo}>
        Completa los datos de tu gasto.
      </Text>

      <Text style={styles.label}>
        Nombre del gasto
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Supermercado"
        placeholderTextColor="#9CA3AF"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>
        Monto
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 25000"
        placeholderTextColor="#9CA3AF"
        value={monto}
        onChangeText={setMonto}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>
        Categoría
      </Text>
      <TextInput
        style={[styles.input, styles.lastInput]}
        placeholder="Ej. Alimentación"
        placeholderTextColor="#9CA3AF"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={guardarGasto}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBoton}>
          Guardar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  titulo: {
    marginBottom: 8,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  subtitulo: {
    marginBottom: 24,
    fontSize: 16,
    color: '#7F8C8D',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  input: {
    marginBottom: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    padding: 16,
    fontSize: 16,
    color: '#2C3E50',
  },
  lastInput: {
    marginBottom: 28,
  },
  boton: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2980B9',
    padding: 16,
  },
  textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
