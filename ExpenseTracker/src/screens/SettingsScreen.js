import React from 'react';
import {
  ActivityIndicator,
  Switch,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useExpenses } from '../context/ExpensesContext';

export default function SettingsScreen() {
  const {
    notificationsEnabled,
    setNotificationsEnabled,
    darkModeEnabled,
    setDarkModeEnabled,
    settingsLoaded,
  } = useExpenses();

  if (!settingsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configuración</Text>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          accessibilityLabel="Activar notificaciones"
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Modo oscuro</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          accessibilityLabel="Activar modo oscuro"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 24,
  },
  settingRow: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D5D8DC',
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
  },
});