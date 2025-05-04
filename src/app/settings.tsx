import CalendarIntegration from '@/components/settings/CalendarIntegration';
import ReminderSettings from '@/components/settings/ReminderSettings';
import SyncedEvents from '@/components/settings/SyncedEvents';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function SettingsScreen() {
	const events = [
		{ id: 1, name: 'Event 1', date: '2025-05-01', synced: true },
		{ id: 2, name: 'Event 2', date: '2025-05-03', synced: false },
	]
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Calendar & Reminder</Text>
      <ScrollView style={styles.scrollView}>
        <CalendarIntegration />
        <ReminderSettings />
        <SyncedEvents events={events}  />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		backgroundColor: '#F8F9FA',
		marginTop: 28,
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
