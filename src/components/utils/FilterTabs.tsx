import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FilterTabsProps {
	selectedTab: string;
	onSelectTab: (tab: string) => void;
}

export default function FilterTabs({
	selectedTab,
	onSelectTab,
}: FilterTabsProps) {
	const tabs = ['All', 'Recipient', 'Occasion', 'Tag'];

	return (
		<View style={styles.container}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab}
					style={[styles.tab, selectedTab === tab && styles.selectedTab]}
					onPress={() => onSelectTab(tab)}
				>
					<Text
						style={[
							styles.tabText,
							selectedTab === tab && styles.selectedTabText,
						]}
					>
						{tab}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingVertical: 8,
		gap: 8,
	},
	tab: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: 'transparent',
	},
	selectedTab: {
		backgroundColor: '#e8eeff',
	},
	tabText: {
		color: '#666',
		fontSize: 14,
	},
	selectedTabText: {
		color: '#4B6BFB',
	},
});
