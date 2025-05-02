import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import RecipientCard from '@/components/utils/RecipientCard';
import { fetchRecipients } from '@/features/recipients/recipientService';
import { Recipient } from '@/features/recipients/types';

const AllRecipientsScreen = () => {
	const router = useRouter();
	const [recipients, setRecipients] = useState<Recipient[]>([]);
	const [sortField, setSortField] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	useEffect(() => {
		const loadRecipients = async () => {
			try {
				const data = await fetchRecipients();
				setRecipients(data);
			} catch (error) {
				console.error('Failed to fetch recipients:', error);
			}
		};

		loadRecipients();
	}, []);

	const handleAddRecipient = () => {
		router.push('/recipients/add-recipient');
	};

	const handleSort = (field: keyof Recipient) => {
		const newOrder =
			sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
		setSortField(field);
		setSortOrder(newOrder);

		const sortedRecipients = [...recipients].sort((a, b) => {
			if (newOrder === 'asc') {
				return (a[field] ?? '') > (b[field] ?? '') ? 1 : -1;
			} else {
				return (a[field] ?? '') < (b[field] ?? '') ? 1 : -1;
			}
		});

		setRecipients(sortedRecipients);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.searchContainer}>
					<Ionicons
						name="search"
						size={20}
						color="#666"
						style={styles.searchIcon}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder="Search"
						placeholderTextColor="#666"
					/>
				</View>
				<Pressable style={styles.addButton} onPress={handleAddRecipient}>
					<Text style={styles.addButtonText}>Add</Text>
				</Pressable>
			</View>

			<Text style={styles.title}>All Recipients</Text>

			<View style={styles.sortButtonsContainer}>
				{['name', 'budget', 'spent'].map((field) => (
					<Pressable
						key={field}
						style={[
							styles.sortButton,
							sortField === field && styles.activeSortButton,
						]}
						onPress={() => handleSort(field as keyof Recipient)}
					>
						<Text style={styles.sortButtonText}>
							{field.charAt(0).toUpperCase() + field.slice(1)}
						</Text>
						<Ionicons
							name={
								sortField === field && sortOrder === 'asc'
									? 'arrow-up'
									: 'arrow-down'
							}
							size={16}
							color={sortField === field ? '#4ADE80' : '#666'}
						/>
					</Pressable>
				))}
			</View>

			<ScrollView style={styles.scrollView}>
				{recipients.map((recipient) => (
					<RecipientCard
						key={recipient.id}
						id={recipient.id}
						image={recipient.image}
						name={recipient.name}
						description={recipient?.description}
						budget={recipient.budget}
						spent={recipient.spent}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		gap: 12,
	},
	searchContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		height: 40,
		fontSize: 16,
		color: '#333333',
	},
	addButton: {
		backgroundColor: '#4ADE80',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
	},
	addButtonText: {
		color: 'white',
		fontWeight: '600',
	},
	title: {
		fontSize: 24,
		fontWeight: '600',
		paddingHorizontal: 16,
		marginBottom: 16,
		color: '#33333',
	},
	sortButtonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 16,
	},
	sortButton: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 8,
		borderRadius: 8,
		backgroundColor: '#E5E7EB',
	},
	activeSortButton: {
		backgroundColor: '#D1FAE5',
	},
	sortButtonText: {
		marginRight: 4,
		fontSize: 16,
		color: '#333333',
	},
	scrollView: {
		flex: 1,
	},
});

export default AllRecipientsScreen;
