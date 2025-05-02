import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Recipient } from '@/features/recipients/types';

export default function RecipientCard({
	id,
	image,
	name,
	description,
	budget,
	spent,
}: Recipient) {
	const router = useRouter();

	const handlePress = () => {
		router.push({
			pathname: '/recipients/detail-recipient',
			params: { id },
		});
	};

	return (
		<Pressable style={styles.card} onPress={handlePress}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.name}>{name}</Text>
				{description && <Text style={styles.description}>{description}</Text>}
				<Text style={styles.budget}>Budget: ${budget}</Text>
				<Text style={styles.spent}>Spent: ${spent}</Text>
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
		borderRadius: 30,
	},
	content: {
		marginLeft: 12,
		flex: 1,
	},
	name: {
		fontSize: 16,
		fontWeight: '600',
		color: '#333333',
	},
	description: {
		fontSize: 14,
		color: '#666666',
		marginTop: 4,
	},
	budget: {
		fontSize: 14,
		color: '#666666',
		marginTop: 4,
	},
	spent: {
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
