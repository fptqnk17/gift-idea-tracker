import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
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
import Modal from 'react-native-modal';

import Loading from '@/components/Loading';
import { addGift } from '@/features/gifts/giftSlice';
import { fetchRecipients } from '@/features/recipients/recipientService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { uploadGiftThumbnail } from '@/services/uploadImage';
import { formatPrice } from '@/utils/priceUtils';

const AddGiftScreen = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { loading } = useAppSelector((state) => state.gifts);

	const [image, setImage] = useState<string | null>(null);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [recipient, setRecipient] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const [recipients, setRecipients] = useState<
		{ id: string; name: string; budget: number; spent: number }[]
	>([]);
	const [showRecipientModal, setShowRecipientModal] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [errors, setErrors] = useState({
		title: '',
		price: '',
		recipient: '',
		selectedDate: '',
	});

	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const loadRecipients = async () => {
			try {
				const data = await fetchRecipients();
				setRecipients(data);
			} catch (error) {
				alert('Failed to load recipients');
			}
		};

		loadRecipients();
	}, []);

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
		const selectedRecipient = recipients.find((r) => r.id === recipient);

		if (!selectedRecipient) {
			console.error('Selected recipient not found');
			setErrors({ ...errors, recipient: 'Recipient is required' });
			return false;
		}

		const newErrors = {
			title: title ? '' : 'Title is required',
			price: price
				? isNaN(Number(price))
					? 'Price must be a valid number'
					: parseFloat(price) > selectedRecipient.budget
						? 'Price exceeds recipient budget'
						: parseFloat(price) + selectedRecipient.spent >
							  selectedRecipient.budget
							? 'Total spent exceeds recipient budget'
							: ''
				: 'Price is required',
			recipient: recipient ? '' : 'Recipient is required',
			selectedDate: selectedDate ? '' : 'Date is required',
		};

		setErrors(newErrors);

		return !Object.values(newErrors).some((error) => error !== '');
	};

	const handleSave = async () => {
		if (!validateFields()) {
			return;
		}

		setIsSaving(true);

		try {
			let uploadedImageUrl = image;

			if (image) {
				uploadedImageUrl = await uploadGiftThumbnail(image);
			}

			const giftData = {
				image: uploadedImageUrl || 'https://placeholder.com/default-image.png',
				title,
				description,
				price: parseFloat(price),
				recipient: recipient || '',
				selectedDate: selectedDate ? selectedDate.toISOString() : '',
			};

			await dispatch(addGift(giftData)).unwrap();
			alert('Gift added successfully!');

			router.push('/(gifts)');
		} catch (error) {
			console.error('Error saving gift:', error);
			const errorMessage =
				error instanceof Error ? error.message : 'An unknown error occurred';
			alert(`Failed to add gift: ${errorMessage}`);
		} finally {
			setIsSaving(false);
		}
	};

	if (loading) {
		return <Loading />;
	}

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
				<Text style={styles.label}>
					Title <Text style={styles.required}>*</Text>
				</Text>
				<TextInput
					style={[styles.input, errors.title && styles.inputError]}
					placeholder="Enter title"
					value={title}
					onChangeText={(text) => {
						setTitle(text);
						if (errors.title) setErrors({ ...errors, title: '' });
					}}
				/>
				{errors.title ? (
					<Text style={styles.errorText}>{errors.title}</Text>
				) : null}
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
				<Text style={styles.label}>
					Price <Text style={styles.required}>*</Text>
				</Text>
				<TextInput
					style={[styles.input, errors.price && styles.inputError]}
					placeholder="Enter price"
					value={price}
					onChangeText={(text) => {
						setPrice(text);
						if (errors.price) setErrors({ ...errors, price: '' });
					}}
					keyboardType="numeric"
				/>
				{errors.price ? (
					<Text style={styles.errorText}>{errors.price}</Text>
				) : null}
			</View>

			{/* Recipient */}
			<View style={styles.inputGroup}>
				<Text style={styles.label}>
					Recipient <Text style={styles.required}>*</Text>
				</Text>
				<TouchableOpacity
					style={[styles.dropdown, errors.recipient && styles.inputError]}
					onPress={() => setShowRecipientModal(true)}
				>
					<Text style={styles.dropdownText}>
						{recipient
							? recipients.find((r) => r.id === recipient)?.name
							: 'Choose Recipient'}
					</Text>
					<MaterialIcons name="arrow-drop-down" size={24} color="#666" />
				</TouchableOpacity>
				{errors.recipient ? (
					<Text style={styles.errorText}>{errors.recipient}</Text>
				) : null}

				{/* Hiển thị Budget và Spent */}
				{recipient && (
					<View style={styles.recipientInfo}>
						<Text style={styles.infoText}>
							Budget: $
							{formatPrice(
								recipients.find((r) => r.id === recipient)?.budget || 0,
							)}
						</Text>
						<Text style={styles.infoText}>
							Spent: $
							{formatPrice(
								recipients.find((r) => r.id === recipient)?.spent || 0,
							)}
						</Text>
					</View>
				)}
			</View>

			{/* Selected Date */}
			<View style={styles.inputGroup}>
				<Text style={styles.label}>
					Selected Date <Text style={styles.required}>*</Text>
				</Text>
				<TouchableOpacity
					style={[styles.dropdown, errors.selectedDate && styles.inputError]}
					onPress={() => setShowDatePicker(true)}
				>
					<Text style={styles.dropdownText}>
						{selectedDate ? selectedDate.toDateString() : 'Pick a date'}
					</Text>
					<MaterialIcons name="calendar-today" size={20} color="#666" />
				</TouchableOpacity>
				{errors.selectedDate ? (
					<Text style={styles.errorText}>{errors.selectedDate}</Text>
				) : null}
			</View>

			{/* Save Button */}
			<TouchableOpacity
				style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
				onPress={handleSave}
				disabled={isSaving}
			>
				<Text style={styles.saveButtonText}>
					{isSaving ? 'Saving...' : 'Save Gift'}
				</Text>
			</TouchableOpacity>

			{/* Recipient Modal */}
			<Modal
				isVisible={showRecipientModal}
				onBackdropPress={() => setShowRecipientModal(false)}
				onBackButtonPress={() => setShowRecipientModal(false)}
			>
				<View style={styles.modalContent}>
					{recipients.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={styles.option}
							onPress={() => {
								setRecipient(item.id);
								setErrors({ ...errors, recipient: '' });
								setShowRecipientModal(false);
							}}
						>
							<View style={styles.radioButtonContainer}>
								<MaterialIcons
									name={
										recipient === item.id
											? 'radio-button-checked'
											: 'radio-button-unchecked'
									}
									size={24}
									color={recipient === item.id ? '#007AFF' : '#666'}
								/>
								<Text style={styles.optionText}>{item.name}</Text>
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
						if (event.type === 'set' && date) {
							setSelectedDate(date);
							setErrors({ ...errors, selectedDate: '' });
						}
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
	required: {
		color: 'red',
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
	inputError: {
		borderColor: 'red',
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 4,
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
	saveButtonDisabled: {
		backgroundColor: '#A0A0A0',
	},
	saveButtonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
	},
	recipientInfo: {
		marginTop: 8,
		padding: 8,
		backgroundColor: '#F9F9F9',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#E0E0E0',
	},
	infoText: {
		fontSize: 14,
		color: '#333',
	},
});

export default AddGiftScreen;
