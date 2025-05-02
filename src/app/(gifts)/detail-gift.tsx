import FastImage from 'expo-fast-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import Loading from '@/components/Loading';
import { deleteGift, fetchGifts } from '@/features/gifts/giftSlice';
import { findRecipientById } from '@/features/recipients/recipientService';
import { useAppDispatch } from '@/redux/hooks';
import { deleteGiftThumbnail } from '@/services/deleteImage';
import { formatDate } from '@/utils/dateUtils';
import { formatPrice } from '@/utils/priceUtils';

const DetailGiftScreen = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { id, image, title, description, price, recipient, selectedDate } =
		useLocalSearchParams() as unknown as {
			id: string;
			image: string;
			title: string;
			description?: string;
			price: number;
			recipient: string;
			selectedDate: string;
		};

	const [recipientName, setRecipientName] = useState<string | null>(null);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const fetchRecipientName = async () => {
			const name = await findRecipientById(Number(recipient));
			setRecipientName(name);
		};

		fetchRecipientName();
	}, [recipient]);

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
					onPress: async () => {
						try {
							setIsDeleting(true);

							await deleteGiftThumbnail(image);

							await dispatch(deleteGift(id));

							await dispatch(fetchGifts());

							router.push('/(gifts)');

							setTimeout(() => {
								Alert.alert('Success', 'Gift deleted successfully.');
							}, 500);
						} catch (error) {
							console.error('Failed to delete gift or thumbnail:', error);
							Alert.alert(
								'Error',
								'Failed to delete the gift. Please try again.',
							);
						} finally {
							setIsDeleting(false);
						}
					},
				},
			],
		);
	};

	const formattedDate = formatDate(selectedDate);

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				{isImageLoading && <Loading />}
				<FastImage
					source={{ uri: image }}
					style={styles.image}
					cacheKey={id}
					contentFit="cover"
					onLoadStart={() => setIsImageLoading(true)}
					onLoad={() => setIsImageLoading(false)}
				/>
			</View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.price}>{`$${formatPrice(price)}`}</Text>
			<Text style={styles.date}>Happening on {formattedDate}</Text>
			<Text style={styles.recipient}>for {recipientName || 'Loading...'}</Text>

			<View style={styles.actions}>
				<Pressable
					style={[styles.deleteButton, isDeleting && styles.disabledButton]}
					onPress={!isDeleting ? handleDelete : undefined}
				>
					{isDeleting ? (
						<ActivityIndicator size="small" color="#FFFFFF" />
					) : (
						<Text style={styles.buttonText}>Delete</Text>
					)}
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
	imageContainer: {
		width: '100%',
		height: 250,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
		position: 'relative',
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#f0f0f0',
		position: 'absolute',
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
	disabledButton: {
		backgroundColor: '#FFB3B3',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
});

export default DetailGiftScreen;
