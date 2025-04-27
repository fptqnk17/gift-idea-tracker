import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddGiftScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleAddGift = () => {
    console.log({ title, description, recipient, selectedDate });
    navigation.goBack();
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    setShowPicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            value={String(price)}
            onChangeText={(text) => setPrice(Number(text))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image</Text>
          <Pressable style={styles.uploadButton}>
            <Ionicons name="cloud-upload-outline" size={24} color="#666" />
            <Text style={styles.uploadText}>Choose Image</Text>
          </Pressable>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Choose Recipient</Text>
          <Pressable style={styles.select}>
            <Text style={styles.selectText}>Choose Recipient</Text>
            <Ionicons name="chevron-down" size={24} color="#666" />
          </Pressable>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Choose Time Event</Text>
          <Pressable
            style={styles.select}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.selectText}>
              {selectedDate.toLocaleString()}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#666" />
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <Pressable style={styles.addButton} onPress={handleAddGift}>
          <Text style={styles.addButtonText}>Add Gift Idea</Text>
        </Pressable>

        <Pressable
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingVertical: 16,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666666',
  },
  select: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  selectText: {
    fontSize: 16,
    color: '#666666',
  },
  addButton: {
    backgroundColor: '#4B6BFB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
  },
});

export default AddGiftScreen;
