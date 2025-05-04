import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';

import Loading from '@/components/Loading';
import {
	deleteRecipient,
	findRecipientById,
} from '@/features/recipients/recipientService';
import { Recipient } from '@/features/recipients/types';
import { formatPrice } from '@/utils/priceUtils';

const DetailRecipientScreen = () => {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const [recipient, setRecipient] = useState<Recipient | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const fetchRecipient = async () => {
			try {
				const data = await findRecipientById(Number(id));
				if (data && typeof data === 'object' && 'id' in data) {
					setRecipient(data as Recipient);
				} else {
					throw new Error('Invalid recipient data');
				}
			} catch (error) {
				console.error('Failed to fetch recipient:', error);
				Alert.alert('Error', 'Failed to load recipient details.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchRecipient();
	}, [id]);

	const handleEdit = () => {
		router.push({
			pathname: '/recipients/edit-recipient',
			params: { id },
		});
	};

	const handleDelete = () => {
		if (!recipient) return;
		Alert.alert(
			'Confirm Delete',
			`Are you sure you want to delete the recipient "${recipient.name}"?`,
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Delete',
					style: 'destructive',
					onPress: async () => {
						try {
							setIsDeleting(true);

							await deleteRecipient(recipient.id);

							router.push('/recipients');

							setTimeout(() => {
								Alert.alert('Success', 'Recipient deleted successfully.');
							}, 500);
						} catch (error) {
							console.error('Failed to delete recipient:', error);
							Alert.alert(
								'Error',
								'Failed to delete the recipient. Please try again.',
							);
						} finally {
							setIsDeleting(false);
						}
					},
				},
			],
		);
	};

	if (isLoading) {
		return <Loading />;
	}

	if (!recipient) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>Recipient not found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Image source={{ uri: recipient.image }} style={styles.image} />

			<Text style={styles.title}>{recipient.name}</Text>
			<Text style={styles.budget}>Budget: {formatPrice(recipient.budget)}</Text>
			<Text style={styles.spent}>Spent: {formatPrice(recipient.spent)}</Text>

			{recipient.description && (
				<Text style={styles.description}>{recipient.description}</Text>
			)}

			{/* Action Buttons: Edit and Delete */}
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
		padding: 16,
		backgroundColor: '#F8F9FA',
		alignItems: 'center',
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 60,
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		color: '#333333',
	},
	budget: {
		fontSize: 18,
		color: '#666666',
		marginTop: 8,
	},
	spent: {
		fontSize: 18,
		color: '#666666',
		marginTop: 4,
	},
	description: {
		fontSize: 16,
		color: '#666666',
		marginTop: 12,
		textAlign: 'center',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
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
	disabledButton: {
		opacity: 0.6,
	},
	errorText: {
		fontSize: 18,
		color: 'red',
		textAlign: 'center',
	},
});

export default DetailRecipientScreen;
