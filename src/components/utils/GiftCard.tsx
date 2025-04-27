import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { GiftIdea } from '@/models/GiftIdea';

interface GiftCardProps extends GiftIdea {
	onEdit?: () => void;
	onDelete?: () => void;
}

export default function GiftCard({
	id,
	image,
	title,
	description,
	price,
	recipient,
	selectedDate,
}: GiftCardProps) {
	const router = useRouter();

	const handlePress = () => {
		router.push({
			pathname: '/detail-gift',
			params: { id, image, title, description, recipient, selectedDate },
		});
	};

	return (
		<Pressable style={styles.card} onPress={handlePress}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.recipient}>for {recipient}</Text>
				<Text style={styles.date}>
					Happening on {new Date(selectedDate).toLocaleDateString()}
				</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: 'white',
		borderRadius: 12,
		marginHorizontal: 16,
		marginVertical: 8,
		flexDirection: 'row',
		padding: 12,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
		alignItems: 'center',
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 8,
	},
	content: {
		marginLeft: 12,
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333333',
	},
	description: {
		fontSize: 14,
		color: '#666666',
		marginTop: 4,
	},
	recipient: {
		fontSize: 14,
		color: '#666666',
		marginTop: 4,
	},
	date: {
		fontSize: 14,
		color: '#666666',
		marginTop: 4,
	},
	actions: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	actionButton: {
		marginVertical: 8,
	},
});
