import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabs() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="add" size={24} color="#666" />
        <Text style={styles.tabText}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="people-outline" size={24} color="#666" />
        <Text style={styles.tabText}>Recipients</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, styles.activeTab]}>
        <Ionicons name="home" size={24} color="#4B6BFB" />
        <Text style={[styles.tabText, styles.activeTabText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="notifications-outline" size={24} color="#666" />
        <Text style={styles.tabText}>Reminders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Ionicons name="wallet-outline" size={24} color="#666" />
        <Text style={styles.tabText}>Budget</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeTab: {
    backgroundColor: '#e6f0ff', // Optional: Add a valid ViewStyle property
  },
  activeTabText: {
    color: '#4B6BFB',
    fontWeight: 'bold', // Optional: Enhance text style
  },
});