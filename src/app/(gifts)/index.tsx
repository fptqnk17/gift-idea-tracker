import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FilterTabs from '@/components/utils/FilterTabs';
import GiftCard from '@/components/utils/GiftCard';
import { GiftIdea } from '@/models/GiftIdea';

const HomeScreen = () => {
	const router = useRouter();

	const [selectedTab, setSelectedTab] = useState('All');

	const giftIdeas: GiftIdea[] = [
		{
			id: '1',
			image:
				'https://api.a0.dev/assets/image?text=gift%20box%20with%20art%20supplies%20and%20golden%20bow',
			title: 'Creative Art Set',
			description: 'Perfect for budding artists',
			price: 29.99,
			recipient: 'Emily',
			selectedDate: new Date('2023-12-25').toISOString(),
		},
		{
			id: '2',
			image:
				'https://api.a0.dev/assets/image?text=luxury%20chocolate%20box%20assortment',
			title: 'Gourmet Chocolate Basket',
			description: 'Indulgent treat for any occasion',
			price: 49.99,
			recipient: 'Michael',
			selectedDate: new Date('2023-11-15').toISOString(),
		},
		{
			id: '3',
			image:
				'https://api.a0.dev/assets/image?text=elegant%20stainless%20steel%20watch',
			title: 'Stainless Steel Watch',
			description: 'Timeless elegance for him',
			price: 199.99,
			recipient: 'Alex',
			selectedDate: new Date('2024-01-01').toISOString(),
		},
		{
			id: '4',
			image:
				'https://api.a0.dev/assets/image?text=stylish%20handbag%20for%20women',
			title: 'Stylish Handbag',
			description: 'Fashionable accessory for her',
			price: 89.99,
			recipient: 'Sophia',
			selectedDate: new Date('2023-10-31').toISOString(),
		},
		{
			id: '5',
			image:
				'https://api.a0.dev/assets/image?text=high-tech%20wireless%20earbuds',
			title: 'Wireless Earbuds',
			description: 'High-quality sound on the go',
			price: 79.99,
			recipient: 'John',
			selectedDate: new Date('2023-11-20').toISOString(),
		},
	];

	const handleAddGift = () => {
		router.push('/add-gift');
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.header}>Your Gift Ideas</Text>
			<FilterTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
			<ScrollView style={styles.scrollView}>
				{giftIdeas.map((gift) => (
					<GiftCard
						key={gift.id}
						id={gift.id}
						image={gift.image}
						title={gift.title}
						description={gift.description}
						price={gift.price}
						recipient={gift.recipient}
						selectedDate={gift.selectedDate}
					/>
				))}
			</ScrollView>
			<Pressable style={styles.addButton} onPress={handleAddGift}>
				<Text style={styles.addButtonText}>+</Text>
			</Pressable>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	header: {
		fontSize: 24,
		fontWeight: '600',
		padding: 16,
		color: '#333333',
	},
	scrollView: {
		flex: 1,
	},
	addButton: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: '#007BFF',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	addButtonText: {
		color: '#FFFFFF',
		fontSize: 24,
		fontWeight: 'bold',
	},
});

export default HomeScreen;
