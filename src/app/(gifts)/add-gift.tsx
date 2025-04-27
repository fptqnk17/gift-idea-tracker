import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddGiftScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [recipient, setRecipient] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const recipients = ['Alex', 'Emily', 'Michael', 'Malow'];

  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    const giftData = {
      image: image || '',
      title,
      description,
      price: parseFloat(price),
      recipient,
      selectedDate: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    };
    console.log(giftData);
    // TODO: gửi giftData lên server hoặc lưu local
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Upload Image */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.pickImageText}>Pick an Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Price */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>

      {/* Recipient */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Recipient</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowRecipientModal(true)}>
          <Text style={styles.dropdownText}>
            {recipient ? recipient : 'Choose Recipient'}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Selected Date */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Selected Date</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dropdownText}>
            {selectedDate ? selectedDate.toDateString() : 'Pick a date'}
          </Text>
          <MaterialIcons name="calendar-today" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Gift</Text>
      </TouchableOpacity>

      {/* Recipient Modal */}
      <Modal
        isVisible={showRecipientModal}
        onBackdropPress={() => setShowRecipientModal(false)}
        onBackButtonPress={() => setShowRecipientModal(false)}
      >
        <View style={styles.modalContent}>
          {recipients.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setRecipient(item);
                setShowRecipientModal(false);
              }}
            >
              <View style={styles.radioButtonContainer}>
                <MaterialIcons
                  name={recipient === item ? 'radio-button-checked' : 'radio-button-unchecked'}
                  size={24}
                  color={recipient === item ? '#007AFF' : '#666'}
                />
                <Text style={styles.optionText}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: 'white',
    color: '#333',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  pickImageText: {
    color: '#666',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
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
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddGiftScreen;
