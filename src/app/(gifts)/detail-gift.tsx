import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { GiftIdea } from '@/models/GiftIdea';

const DetailGiftScreen = () => {
	const router = useRouter();
	const { id, image, title, description, recipient, selectedDate } =
		useLocalSearchParams() as unknown as GiftIdea;

	const handleEdit = () => {
		router.push({
			pathname: '/edit-gift',
			params: {
				id,
				image,
				title,
				description,
				recipient,
				selectedDate,
			},
		});
	};

	const handleDelete = () => {
		Alert.alert(
			'Confirm Delete',
			`Are you sure you want to delete the gift idea "${title}"?`,
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => console.log(`Delete action triggered for ID: ${id}`),
				},
			],
		);
	};

	return (
		<View style={styles.container}>
			<Image source={{ uri: image }} style={styles.image} />
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.recipient}>For: {recipient}</Text>
			<Text style={styles.date}>
				Event Date: {new Date(selectedDate).toLocaleDateString()}
			</Text>
			<View style={styles.actions}>
				<Pressable style={styles.editButton} onPress={handleEdit}>
					<Text style={styles.buttonText}>Edit</Text>
				</Pressable>
				<Pressable style={styles.deleteButton} onPress={handleDelete}>
					<Text style={styles.buttonText}>Delete</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		padding: 16,
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#333333',
		marginBottom: 16,
		textAlign: 'center',
	},
	image: {
		width: '100%',
		height: 200,
		borderRadius: 12,
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333333',
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		color: '#666666',
		marginBottom: 8,
	},
	recipient: {
		fontSize: 16,
		color: '#666666',
		marginBottom: 8,
	},
	date: {
		fontSize: 16,
		color: '#666666',
		marginBottom: 16,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24,
	},
	editButton: {
		flex: 1,
		backgroundColor: '#007BFF',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginRight: 8,
	},
	deleteButton: {
		flex: 1,
		backgroundColor: '#FF4D4F',
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginLeft: 8,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default DetailGiftScreen;
