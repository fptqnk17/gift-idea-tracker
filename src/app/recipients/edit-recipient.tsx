import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Recipient } from '@/models/Recipient';
import {
	useNavigation,
	useRoute as useRouteAlias,
} from '@react-navigation/native';

const EditRecipientScreen = () => {
  const navigation = useNavigation();
	const route = useRouteAlias();
	const recipient = route.params as Recipient;
  const [image, setImage] = useState<string | null>(recipient.image);
  const [name, setName] = useState(recipient.name);
  const [description, setDescription] = useState(recipient.description || '');
  const [budget, setBudget] = useState(recipient.budget.toString());
  const [spent, setSpent] = useState(recipient.spent.toString());

  useEffect(() => {
    if (recipient) {
      setImage(recipient.image);
      setName(recipient.name);
      setDescription(recipient.description || '');
      setBudget(recipient.budget.toString());
      setSpent(recipient.spent.toString());
    }
  }, [recipient]);

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

  const handleSaveRecipient = () => {
    const updatedRecipient = {
      image: image || '',
      name,
      description,
      budget: parseFloat(budget),
      spent: parseFloat(spent),
    };
    console.log(updatedRecipient);
    // TODO: gửi updatedRecipient lên server hoặc lưu vào cơ sở dữ liệu
    // Điều hướng trở lại màn hình trước
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Upload Image */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Profile Image</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.previewImage} />
          ) : (
            <Text style={styles.pickImageText}>Pick an Image</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Name */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's name"
          value={name}
          onChangeText={setName}
        />
      </View>

      {/* Description */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>

      {/* Budget */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Budget</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter budget"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />
      </View>

      {/* Spent */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Spent</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter spent amount"
          value={spent}
          onChangeText={setSpent}
          keyboardType="numeric"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipient}>
        <Text style={styles.saveButtonText}>Save Recipient</Text>
      </TouchableOpacity>
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

export default EditRecipientScreen;
