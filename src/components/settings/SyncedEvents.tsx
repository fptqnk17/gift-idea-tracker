import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SyncedEvents = () => {
  const events = [
    { id: 1, name: 'Event name', date: '12 Dec 2025', synced: true },
    { id: 2, name: 'Event name', date: '12 Dec 2025', synced: false },
		{ id: 3, name: 'Event name', date: '12 Dec 2025', synced: true },
		{ id: 4, name: 'Event name', date: '12 Dec 2025', synced: true },
		{ id: 5, name: 'Event name', date: '12 Dec 2025',		synced: true },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Synced Events</Text>
      {events.map(event => (
        <View key={event.id} style={styles.eventItem}>
          <View style={styles.eventInfo}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDate}>{event.date}</Text>
          </View>
          <View style={styles.actions}>
            {event.synced ? (
              <MaterialIcons name="check" size={20} color="#4CAF50" />
            ) : (
              <MaterialIcons name="close" size={20} color="#F44336" />
            )}
            <MaterialIcons name="content-copy" size={20} color="#666" style={styles.actionIcon} />
            <MaterialIcons name="delete" size={20} color="#666" />
          </View>
        </View>
      ))}
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
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 13,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginHorizontal: 12,
  },
});

export default SyncedEvents;
