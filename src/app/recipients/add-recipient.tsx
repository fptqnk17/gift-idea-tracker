import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import { addRecipient } from '@/features/recipients/recipientService';
import { uploadRecipientAvatar } from '@/services/uploadImage';

const AddRecipientScreen = () => {
	const [image, setImage] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [budget, setBudget] = useState('');
	const [spent, setSpent] = useState('');
	const [errors, setErrors] = useState<{ name: string; budget: string }>({
		name: '',
		budget: '',
	});
	const [isSaving, setIsSaving] = useState(false);

	const pickImage = async () => {
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

	const validateFields = () => {
		const errors = {
			name: name ? '' : 'Name is required',
			budget: budget
				? isNaN(Number(budget)) || Number(budget) <= 0
					? 'Budget must be a valid positive number'
					: ''
				: 'Budget is required',
		};

		setErrors(errors);

		return !Object.values(errors).some((error) => error !== '');
	};

	const handleSaveRecipient = async () => {
		if (!validateFields()) {
			return;
		}

		setIsSaving(true);

		try {
			let uploadedImageUrl = image;

			if (image) {
				uploadedImageUrl = await uploadRecipientAvatar(image);
			} else {
				uploadedImageUrl =
					'https://ylguuncnueronwhhdvbk.supabase.co/storage/v1/object/public/recipient-avatar//recipient-avatar-placeholder.jpg';
			}

			const recipientData = {
				image: uploadedImageUrl,
				name,
				description,
				budget: parseFloat(budget),
				spent: 0,
			};

			await addRecipient(recipientData);

			alert('Recipient added successfully!');
			router.push('/recipients');
		} catch (error) {
			console.error('Error saving recipient:', error);
			alert('Failed to add recipient. Please try again.');
		} finally {
			setIsSaving(false);
		}
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
					onBlur={() => validateFields()}
				/>
				{errors.name ? (
					<Text style={styles.errorText}>{errors.name}</Text>
				) : null}
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
					onBlur={() => validateFields()}
				/>
				{errors.budget ? (
					<Text style={styles.errorText}>{errors.budget}</Text>
				) : null}
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
			<TouchableOpacity
				style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
				onPress={handleSaveRecipient}
				disabled={isSaving}
			>
				<Text style={styles.saveButtonText}>
					{isSaving ? 'Saving...' : 'Save Recipient'}
				</Text>
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
	saveButtonDisabled: {
		backgroundColor: '#A0A0A0',
	},
	saveButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 4,
	},
});

export default AddRecipientScreen;
