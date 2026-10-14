
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
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

    if (isNaN(Number(monto.replace(',', '.'))) ||
        Number(monto.replace(',', '.')) <= 0) {
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
    <View className="flex-1 justify-center bg-gray-100 px-6 py-8">
      <Text className="mb-2 text-3xl font-bold text-gray-800">
        Nuevo gasto
      </Text>

      <Text className="mb-6 text-base text-gray-500">
        Completa los datos de tu gasto.
      </Text>

      <Text className="mb-2 text-base font-semibold text-gray-700">
        Nombre del gasto
      </Text>
      <TextInput
        className="mb-5 rounded-xl border border-gray-300 bg-white p-4 text-base text-gray-800"
        placeholder="Ej. Supermercado"
        placeholderTextColor="#9CA3AF"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text className="mb-2 text-base font-semibold text-gray-700">
        Monto
      </Text>
      <TextInput
        className="mb-5 rounded-xl border border-gray-300 bg-white p-4 text-base text-gray-800"
        placeholder="Ej. 25000"
        placeholderTextColor="#9CA3AF"
        value={monto}
        onChangeText={setMonto}
        keyboardType="decimal-pad"
      />

      <Text className="mb-2 text-base font-semibold text-gray-700">
        Categoría
      </Text>
      <TextInput
        className="mb-7 rounded-xl border border-gray-300 bg-white p-4 text-base text-gray-800"
        placeholder="Ej. Alimentación"
        placeholderTextColor="#9CA3AF"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TouchableOpacity
        className="items-center rounded-xl bg-blue-600 p-4 active:bg-blue-700"
        onPress={guardarGasto}
        activeOpacity={0.8}
      >
        <Text className="text-base font-bold text-white">
          Guardar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
