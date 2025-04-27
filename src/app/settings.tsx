import CalendarIntegration from '@/components/settings/CalendarIntegration';
import ReminderSettings from '@/components/settings/ReminderSettings';
import SyncedEvents from '@/components/settings/SyncedEvents';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Calendar & Reminder</Text>
      <ScrollView style={styles.scrollView}>
        <CalendarIntegration />
        <ReminderSettings />
        <SyncedEvents />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
		padding: 16,
  },
});
