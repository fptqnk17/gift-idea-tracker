import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const ReminderSettings = () => {
  const [leadTime, setLeadTime] = useState('1 day before');
  const [occasions, setOccasions] = useState('All occasions');
  const [isLeadTimeModalVisible, setIsLeadTimeModalVisible] = useState(false);
  const [isOccasionsModalVisible, setIsOccasionsModalVisible] = useState(false);

  const leadTimeOptions = ['1 day before', '2 days before', '1 week before', '1 month before'];
  const occasionsOptions = ['All occasions', 'Special occasions', 'Anniversaries'];

  const toggleLeadTimeModal = () => {
    setIsLeadTimeModalVisible(!isLeadTimeModalVisible);
  };

  const toggleOccasionsModal = () => {
    setIsOccasionsModalVisible(!isOccasionsModalVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reminder Settings</Text>

      <Text style={styles.label}>Choose lead time for reminders:</Text>
      <TouchableOpacity style={styles.dropdown} onPress={toggleLeadTimeModal}>
        <Text style={styles.dropdownText}>{leadTime}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      <Text style={styles.label}>Apply to:</Text>
      <TouchableOpacity style={styles.dropdown} onPress={toggleOccasionsModal}>
        <Text style={styles.dropdownText}>{occasions}</Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      {/* Lead Time Modal */}
      <Modal
        isVisible={isLeadTimeModalVisible}
        onBackdropPress={toggleLeadTimeModal}
        onBackButtonPress={toggleLeadTimeModal}
      >
        <View style={styles.modalContent}>
          {leadTimeOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setLeadTime(option);
                toggleLeadTimeModal();
              }}
            >
              <View style={styles.radioButtonContainer}>
                <MaterialIcons
                  name={leadTime === option ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={24}
                  color={leadTime === option ? '#007AFF' : '#666'}
                />
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Occasions Modal */}
      <Modal
        isVisible={isOccasionsModalVisible}
        onBackdropPress={toggleOccasionsModal}
        onBackButtonPress={toggleOccasionsModal}
      >
        <View style={styles.modalContent}>
          {occasionsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setOccasions(option);
                toggleOccasionsModal();
              }}
            >
              <View style={styles.radioButtonContainer}>
                <MaterialIcons
                  name={occasions === option ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={24}
                  color={occasions === option ? '#007AFF' : '#666'}
                />
                <Text style={styles.optionText}>{option}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  option: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});

export default ReminderSettings;
