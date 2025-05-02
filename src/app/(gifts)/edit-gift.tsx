import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

import { updateGift } from '@/features/gifts/giftSlice';
import {
	fetchRecipients,
	findRecipientById,
} from '@/features/recipients/recipientService';
import { useAppDispatch } from '@/redux/hooks';
import { updateGiftThumbnail } from '@/services/updateImage';
import { formatPrice } from '@/utils/priceUtils';

const EditGiftScreen = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const params = useLocalSearchParams() as unknown as {
		id: string;
		image: string;
		title: string;
		description?: string;
		price: number;
		recipient: string;
		selectedDate: string;
	};

	const [title, setTitle] = useState(params?.title || '');
	const [description, setDescription] = useState(params?.description || '');
	const [recipient, setRecipient] = useState<string | null>(
		params?.recipient || null,
	);
	const [recipientName, setRecipientName] = useState<string | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date | null>(
		params?.selectedDate ? new Date(params.selectedDate) : null,
	);
	const [image, setImage] = useState<string | null>(params?.image || null);

	const [recipients, setRecipients] = useState<
		{ id: string; name: string; budget: number; spent: number }[]
	>([]);
	const [showRecipientModal, setShowRecipientModal] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [errors, setErrors] = useState({
		title: '',
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

		const loadRecipientName = async () => {
			if (recipient) {
				try {
					const recipientData = recipients.find((r) => r.id === recipient);
					if (recipientData) {
						setRecipientName(recipientData.name);
					} else {
						const fetchedRecipient = await findRecipientById(Number(recipient));
						if (fetchedRecipient) {
							setRecipientName(fetchedRecipient.name);
						} else {
							console.error('Recipient not found');
						}
					}
				} catch (error) {
					console.error('Failed to fetch recipient name:', error);
				}
			}
		};

		loadRecipients();
		loadRecipientName();
	}, [recipient, recipients]);

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
		const newErrors = {
			title: title ? '' : 'Title is required',
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

		if (!recipient) {
			alert('Please select a recipient.');
			return;
		}

		setIsSaving(true);

		try {
			let updatedImageUrl = params.image;

			if (image && image !== params.image) {
				updatedImageUrl = await updateGiftThumbnail(params.image, image);
			}

			const giftData = {
				id: params.id,
				image: updatedImageUrl || 'https://placeholder.com/default-image.png',
				title,
				description,
				recipient: recipient,
				selectedDate: selectedDate ? selectedDate.toISOString() : '',
			};

			await dispatch(updateGift(giftData)).unwrap();

			alert('Gift updated successfully!');
			router.push('/(gifts)');
		} catch (error) {
			console.error('Error updating gift:', error);
			const errorMessage =
				error instanceof Error ? error.message : 'An unknown error occurred';
			alert(`Failed to update gift: ${errorMessage}`);
		} finally {
			setIsSaving(false);
		}
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

			{/* Price (Read-only) */}
			<View style={styles.inputGroup}>
				<Text style={styles.label}>Price</Text>
				<Text style={styles.infoText}>${formatPrice(params.price)}</Text>
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
						{recipientName || 'Choose Recipient'}
					</Text>
					<MaterialIcons name="arrow-drop-down" size={24} color="#666" />
				</TouchableOpacity>
				{errors.recipient ? (
					<Text style={styles.errorText}>{errors.recipient}</Text>
				) : null}
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
					{isSaving ? 'Saving...' : 'Save Changes'}
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
								setRecipientName(item.name);
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
						if (event.type === 'set' && date) {
							setSelectedDate(date);
							setErrors({ ...errors, selectedDate: '' });
						}
						setShowDatePicker(false);
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
	infoText: {
		fontSize: 16,
		color: '#333',
	},
});

export default EditGiftScreen;
