import { Ionicons } from '@expo/vector-icons';
import {
	useNavigation,
	useRoute as useRouteAlias,
} from '@react-navigation/native';
import { useState } from 'react';
import {
	Alert,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

import { GiftIdea } from '@/models/GiftIdea';

const EditGiftScreen = () => {
	const navigation = useNavigation();
	const route = useRouteAlias();
	const params = route.params as GiftIdea;

	const [title, setTitle] = useState(params?.title || '');
	const [description, setDescription] = useState(params?.description || '');
	const [price, setPrice] = useState(params?.price || 0);
	const [recipient, setRecipient] = useState(params?.recipient || '');
	const [selectedDate, setSelectedDate] = useState(
		params?.selectedDate ? new Date(params.selectedDate) : new Date(),
	);
	const [image, setImage] = useState(params?.image || '');

	const handleEditGift = () => {
		if (!title || !description || !recipient || !image) {
			Alert.alert('Error', 'Please fill in all fields.');
			return;
		}

		const updatedGift: GiftIdea = {
			id: params.id,
			title,
			description,
			price,
			recipient,
			selectedDate: selectedDate.toISOString(),
			image,
		};

		console.log('Updated Gift Idea:', updatedGift);
		Alert.alert('Success', 'Gift idea updated successfully!');
		navigation.goBack();
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
					<Text style={styles.label}>Image</Text>
					{image ? (
						<>
							<Image source={{ uri: image }} style={styles.imagePreview} />
							<Pressable
								style={styles.changeImageButton}
								onPress={() => setImage('https://via.placeholder.com/150')}
							>
								<Text style={styles.changeImageText}>Change Image</Text>
							</Pressable>
						</>
					) : (
						<Text style={styles.noImageText}>No image selected</Text>
					)}
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Choose Recipient</Text>
					<Pressable style={styles.select}>
						<Text style={styles.selectText}>
							{recipient || 'Choose Recipient'}
						</Text>
						<Ionicons name="chevron-down" size={24} color="#666666" />
					</Pressable>
				</View>

				<View style={styles.inputGroup}>
					<Text style={styles.label}>Choose Time Event</Text>
					<Pressable style={styles.select}>
						<Text style={styles.selectText}>
							{selectedDate.toISOString().split('T')[0]}
						</Text>
						<Ionicons name="chevron-down" size={24} color="#666666" />
					</Pressable>
				</View>

				<Pressable style={styles.addButton} onPress={handleEditGift}>
					<Text style={styles.addButtonText}>Save Changes</Text>
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
	},
	scrollView: {
		flex: 1,
		padding: 16,
	},
	header: {
		fontSize: 24,
		fontWeight: '600',
		marginBottom: 24,
		color: '#333333',
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
	imagePreview: {
		width: '100%',
		height: 200,
		borderRadius: 8,
		marginBottom: 12,
	},
	noImageText: {
		fontSize: 16,
		color: '#666666',
		marginBottom: 12,
		textAlign: 'center',
	},
	changeImageButton: {
		backgroundColor: '#007BFF',
		borderRadius: 8,
		padding: 12,
		alignItems: 'center',
		marginTop: 8,
	},
	changeImageText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '600',
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
		marginBottom: 20,
	},
});
export default EditGiftScreen;
function useRoute() {
	throw new Error('Function not implemented.');
}
