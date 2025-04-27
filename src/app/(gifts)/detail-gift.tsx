import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'expo-fast-image';
import { GiftIdea } from '@/models/GiftIdea';

const DetailGiftScreen = () => {
	const router = useRouter();
	const { id, image, title, description, price, recipient, selectedDate } =
		useLocalSearchParams() as unknown as GiftIdea;

	const handleEdit = () => {
		router.push({
			pathname: '/edit-gift',
			params: {
				id,
				image,
				title,
				description,
				price,
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
			<FastImage
				source={{ uri: image }}
				style={styles.image}
				cacheKey={id}
				contentFit="cover"
			/>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.price}>${price}</Text>
			<Text style={styles.date}>
				Happening on {new Date(selectedDate).toLocaleDateString()}
			</Text>
			<Text style={styles.recipient}>for {recipient}</Text>

			<View style={styles.actions}>
				<Pressable style={styles.deleteButton} onPress={handleDelete}>
					<Text style={styles.buttonText}>Delete</Text>
				</Pressable>
				<Pressable style={styles.editButton} onPress={handleEdit}>
					<Text style={styles.buttonText}>Edit</Text>
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
	image: {
		width: '100%',
		height: 250,
		borderRadius: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#f0f0f0',
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#333333',
		marginBottom: 8,
	},
	description: {
		fontSize: 16,
		color: '#666666',
		lineHeight: 24,
		marginBottom: 8,
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#28a745',
		marginBottom: 8,
	},
	recipient: {
		fontSize: 16,
		color: '#666666',
		marginBottom: 8,
	},
	date: {
		fontSize: 16,
		color: '#888888',
		marginBottom: 16,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 24,
	},
	editButton: {
		flex: 1,
		backgroundColor: '#ffa200',
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: 'center',
		marginLeft: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 5,
	},
	deleteButton: {
		flex: 1,
		backgroundColor: '#FF4D4F',
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: 'center',
		marginRight: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 5,
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default DetailGiftScreen;
