import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTab() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <Ionicons name="add-circle-outline" size={24} color="#666" />
        <Text style={styles.tabText}>Add</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <Ionicons name="people-outline" size={24} color="#666" />
        <Text style={styles.tabText}>Recipients</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <Ionicons name="home" size={24} color="#4B6BFB" />
        <Text style={[styles.tabText, styles.activeTabText]}>Home</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <Ionicons name="notifications-outline" size={24} color="#666" />
        <Text style={styles.tabText}>Reminders</Text>
      </Pressable>
      
      <Pressable style={styles.tab}>
        <Ionicons name="wallet-outline" size={24} color="#666" />
        <Text style={styles.tabText}>Budget</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeTabText: {
    color: '#4B6BFB',
  },
});