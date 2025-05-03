import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loading from '@/components/Loading';
import FilterTabs from '@/components/utils/FilterTabs';
import GiftCard from '@/components/utils/GiftCard';
import { fetchGifts } from '@/features/gifts/giftSlice';
import { fetchRecipients } from '@/features/recipients/recipientService';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const HomeScreen = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const { gifts, loading, error } = useAppSelector((state) => state.gifts);

	const [recipients, setRecipients] = useState<{ id: string; name: string }[]>(
		[],
	);
	const [selectedTab, setSelectedTab] = useState('All');
	const [searchQuery, setSearchQuery] = useState('');
	const [isTitleSortActive, setIsTitleSortActive] = useState(false);
	const [isDateSortActive, setIsDateSortActive] = useState(false);
	const [titleSortDirection, setTitleSortDirection] = useState<'asc' | 'desc'>(
		'asc',
	);
	const [dateSortDirection, setDateSortDirection] = useState<'asc' | 'desc'>(
		'asc',
	);
	const [recipientFilter, setRecipientFilter] = useState<string | null>(null);

	useEffect(() => {
		dispatch(fetchGifts());

		const loadRecipients = async () => {
			try {
				const data = await fetchRecipients();
				setRecipients(data);
			} catch (error) {
				console.error('Failed to fetch recipients:', error);
			}
		};

		loadRecipients();
	}, [dispatch]);

	const filteredGifts = gifts
		.filter((gift) => gift && gift.id)
		.filter((gift) =>
			selectedTab === 'All' ? true : gift.recipient === selectedTab,
		)
		.filter((gift) =>
			recipientFilter ? gift.recipient === recipientFilter : true,
		)
		.filter((gift) =>
			gift.title.toLowerCase().includes(searchQuery.toLowerCase()),
		)
		.sort((a, b) => {
			if (isTitleSortActive) {
				const direction = titleSortDirection === 'asc' ? 1 : -1;
				const titleComparison = direction * a.title.localeCompare(b.title);
				if (titleComparison !== 0) {
					return titleComparison;
				}
			}

			if (isDateSortActive) {
				const direction = dateSortDirection === 'asc' ? 1 : -1;
				return (
					direction *
					(new Date(a.selectedDate).getTime() -
						new Date(b.selectedDate).getTime())
				);
			}

			return 0;
		});

	const handleSort = (option: 'title' | 'date') => {
		if (option === 'title') {
			setIsTitleSortActive(true);
			setIsDateSortActive(false);
			setTitleSortDirection(
				isTitleSortActive && titleSortDirection === 'asc' ? 'desc' : 'asc',
			);
		} else if (option === 'date') {
			setIsDateSortActive(true);
			setIsTitleSortActive(false);
			setDateSortDirection(
				isDateSortActive && dateSortDirection === 'asc' ? 'desc' : 'asc',
			);
		}
	};

	const handleAddGift = () => {
		router.push('/add-gift');
	};

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.header}>Error: {error}</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.header}>Your Gift Ideas</Text>
			<FilterTabs
				selectedTab={selectedTab}
				onSelectTab={setSelectedTab}
				recipients={recipients}
				selectedRecipient={recipientFilter}
				onSelectRecipient={setRecipientFilter}
			/>

			{/* Thanh tìm kiếm */}
			<View style={styles.searchContainer}>
				<View style={styles.searchBox}>
					<MaterialIcons
						name="search"
						size={24}
						color="#666"
						style={styles.searchIcon}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder="Search gifts..."
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</View>
			</View>

			{/* Dropdown sắp xếp */}
			<View style={styles.sortContainer}>
				<TouchableOpacity
					style={[
						styles.sortButton,
						isTitleSortActive && styles.activeSortButton,
					]}
					onPress={() => handleSort('title')}
				>
					<Text
						style={[
							styles.sortButtonText,
							isTitleSortActive && styles.activeSortButtonText,
						]}
					>
						Sort by Title
					</Text>
					{isTitleSortActive && (
						<MaterialIcons
							name={
								titleSortDirection === 'asc' ? 'arrow-upward' : 'arrow-downward'
							}
							size={16}
							color="#4B6BFB"
						/>
					)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.sortButton,
						isDateSortActive && styles.activeSortButton,
					]}
					onPress={() => handleSort('date')}
				>
					<Text
						style={[
							styles.sortButtonText,
							isDateSortActive && styles.activeSortButtonText,
						]}
					>
						Sort by Date
					</Text>
					{isDateSortActive && (
						<MaterialIcons
							name={
								dateSortDirection === 'asc' ? 'arrow-upward' : 'arrow-downward'
							}
							size={16}
							color="#4B6BFB"
						/>
					)}
				</TouchableOpacity>
			</View>

			<ScrollView style={styles.scrollView}>
				{filteredGifts.map((gift) => {
					if (!gift || !gift.id || typeof gift !== 'object') {
						console.error('Invalid gift data:', gift);
						return null;
					}

					return (
						<GiftCard
							key={gift.id}
							id={gift.id}
							image={gift.image || ''}
							title={gift.title || ''}
							description={gift.description || ''}
							price={gift.price || 0}
							recipient={gift.recipient || ''}
							selectedDate={gift.selectedDate || ''}
						/>
					);
				})}
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
	searchContainer: {
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	searchBox: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#E0E0E0',
		borderRadius: 50,
		paddingHorizontal: 12,
		backgroundColor: 'white',
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
		color: '#333',
	},
	sortContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	sortButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: '#E0E0E0',
		borderRadius: 8,
		backgroundColor: 'white',
	},
	activeSortButton: {
		backgroundColor: '#e8eeff',
		borderColor: '#4B6BFB',
	},
	sortButtonText: {
		fontSize: 16,
		color: '#333',
		marginRight: 4,
	},
	activeSortButtonText: {
		color: '#4B6BFB',
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
