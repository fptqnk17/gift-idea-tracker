import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

import Loading from '@/components/Loading';
import {
	findRecipientById,
	updateRecipient,
} from '@/features/recipients/recipientService';
import { Recipient } from '@/features/recipients/types';
import { updateImageInBucket } from '@/services/updateImage';

const EditRecipientScreen = () => {
	const router = useRouter();
	const recipient = useLocalSearchParams() as unknown as Recipient;
	const [image, setImage] = useState<string | null>(recipient.image);
	const [name, setName] = useState(recipient.name);
	const [description, setDescription] = useState(recipient.description || '');
	const [budget, setBudget] = useState(recipient.budget.toString());
	const [spent, setSpent] = useState(recipient.spent.toString());
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchRecipient = async () => {
			try {
				const data = await findRecipientById(Number(recipient.id));
				if (data && typeof data === 'object') {
					const recipientData = data as Recipient;
					setImage(recipientData.image || null);
					setName(recipientData.name || '');
					setDescription(recipientData.description || '');
					setBudget(recipientData.budget?.toString() || '');
					setSpent(recipientData.spent?.toString() || '');
				} else {
					throw new Error('Recipient not found');
				}
			} catch (error) {
				console.error('Failed to fetch recipient:', error);
				alert('Failed to load recipient details.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecipient();
	}, [recipient.id]);

	if (isLoading) {
		return <Loading />;
	}

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
					: Number(budget) < Number(spent)
						? 'Budget cannot be less than spent amount'
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
			let updatedImageUrl = recipient.image;

			if (image && image !== recipient.image) {
				updatedImageUrl = await updateImageInBucket(
					recipient.image,
					image,
					'recipient-avatar',
				);
			}

			const updatedRecipient = {
				image: updatedImageUrl,
				name,
				description,
				budget: parseFloat(budget),
				spent: parseFloat(spent),
			};

			await updateRecipient(recipient.id, updatedRecipient);

			alert('Recipient updated successfully!');
			router.push({
				pathname: '/recipients/detail-recipient',
				params: { id: recipient.id },
			});
		} catch (error) {
			console.error('Error updating recipient:', error);
			alert('Failed to update recipient. Please try again.');
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

export default EditRecipientScreen;
