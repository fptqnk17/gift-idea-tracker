import { Ionicons } from '@expo/vector-icons';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Recipient } from '@/models/Recipient';

const AllRecipientsScreen = () => {
		const router = useRouter();
	
	const recipients: Recipient[] = [
		{ id: '1', name: 'Alex', budget: 2000, spent: 1500 },
		{ id: '2', name: 'Emily', budget: 2200, spent: 1600 },
		{ id: '3', name: 'Michael', budget: 3000, spent: 1500 },
		{ id: '4', name: 'Malow', budget: 1800, spent: 1200 },
	];

	const handleAddRecipient = () => {
		router.push('/recipients/add-recipient');
	}

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

			<ScrollView style={styles.scrollView}>
				{recipients.map((recipient) => (
					<Pressable key={recipient.id} style={styles.recipientCard}>
						<Text style={styles.recipientName}>{recipient.name}</Text>
						<Text style={styles.budgetText}>Budget: ${recipient.budget}</Text>
						<Text style={styles.spentText}>Spent: ${recipient.spent}</Text>
					</Pressable>
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
	scrollView: {
		flex: 1,
	},
	recipientCard: {
		backgroundColor: 'white',
		marginHorizontal: 16,
		marginBottom: 12,
		padding: 16,
		borderRadius: 12,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	recipientName: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333333',
		marginBottom: 8,
	},
	budgetText: {
		fontSize: 14,
		color: '#666666',
		marginBottom: 4,
	},
	spentText: {
		fontSize: 14,
		color: '#666666',
	},
});

export default AllRecipientsScreen;
