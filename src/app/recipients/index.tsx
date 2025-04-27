import { Ionicons } from '@expo/vector-icons';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { Recipient } from '@/models/Recipient';

const AllRecipientsScreen = () => {
	const router = useRouter();

	const recipients: Recipient[] = [
		{ id: '1', image:'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg', name: 'Alex', budget: 2000, spent: 1500 },
		{ id: '2', image:'https://static.vecteezy.com/system/resources/previews/004/899/833/non_2x/beautiful-girl-with-blue-hair-avatar-of-woman-for-social-network-vector.jpg', name: 'Emily', budget: 2200, spent: 1600 },
		{ id: '3', image:'https://img.freepik.com/premium-vector/boy-with-blue-hoodie-blue-hoodie-with-hoodie-it_1230457-42660.jpg', name: 'Michael', budget: 3000, spent: 1500 },
		{ id: '4', image:'https://img.freepik.com/premium-vector/boy-with-hoodie-that-says-hes-boy_1230457-43316.jpg', name: 'Malow', budget: 1800, spent: 1200 },
	];

	const handleAddRecipient = () => {
		router.push('/recipients/add-recipient');
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

			<ScrollView style={styles.scrollView}>
				{recipients.map((recipient) => (
					<Pressable key={recipient.id} style={styles.recipientCard}>
						<Image
							source={{ uri: recipient.image }}
							style={styles.recipientImage}
						/>
						<View style={styles.recipientContent}>
							<Text style={styles.recipientName}>{recipient.name}</Text>
							<Text style={styles.budgetText}>Budget: ${recipient.budget}</Text>
							<Text style={styles.spentText}>Spent: ${recipient.spent}</Text>
						</View>
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
		flexDirection: 'row',
		alignItems: 'center',
	},
	recipientImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
	},
	recipientContent: {
		marginLeft: 12,
		flex: 1,
	},
	recipientName: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333333',
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
