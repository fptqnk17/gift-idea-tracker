import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { GiftIdea } from '@/features/gifts/types';
import { findRecipientById } from '@/features/recipients/recipientService';
import { formatDate } from '@/utils/dateUtils';

interface GiftCardProps extends GiftIdea {
	onEdit?: () => void;
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
	const [recipientName, setRecipientName] = useState<string | null>(null);

	useEffect(() => {
		const fetchRecipientName = async () => {
			const name = await findRecipientById(Number(recipient));
			setRecipientName(name);
		};

		fetchRecipientName();
	}, [recipient]);

	const formattedDate = formatDate(selectedDate);

	const handlePress = () => {
		router.push({
			pathname: '/detail-gift',
			params: { id, image, title, description, price, recipient, selectedDate },
		});
	};

	return (
		<Pressable style={styles.card} onPress={handlePress}>
			<Image source={{ uri: image }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.recipient}>
					for {recipientName || 'Loading...'}
				</Text>
				<Text style={styles.date}>Happening on {formattedDate}</Text>
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
});
