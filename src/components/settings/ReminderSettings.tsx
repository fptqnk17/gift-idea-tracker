import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ReminderSettings = () => {
  const [leadTime, setLeadTime] = useState('1 day before');
  const [occasions, setOccasions] = useState('All occasions');

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reminder Settings</Text>
      <Text style={styles.label}>Choose lead time for reminders:</Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{leadTime}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.label}>Apply to:</Text>
      <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{occasions}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dropdownText: {
    fontSize: 15,
    color: '#333',
  },
});

export default ReminderSettings;
