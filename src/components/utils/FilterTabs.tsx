import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';

interface FilterTabsProps {
	selectedTab: string;
	onSelectTab: (tab: string) => void;
	recipients: { id: string; name: string }[];
	selectedRecipient: string | null;
	onSelectRecipient: (recipientId: string | null) => void;
}

export default function FilterTabs({
	selectedTab,
	onSelectTab,
	recipients,
	selectedRecipient,
	onSelectRecipient,
}: FilterTabsProps) {
	const tabs = ['All', 'Recipients'];
	const [showRecipientModal, setShowRecipientModal] = useState(false);

	const selectedRecipientName =
		recipients.find((r) => r.id === selectedRecipient)?.name || 'Recipients';

	return (
		<View style={styles.container}>
			{tabs.map((tab) => (
				<TouchableOpacity
					key={tab}
					style={[
						styles.tab,
						tab === 'All' && styles.selectedTab,
						tab === 'Recipients' &&
							selectedRecipient &&
							styles.activeRecipientTab,
					]}
					onPress={() => {
						if (tab === 'Recipients') {
							setShowRecipientModal(true);
						}
					}}
				>
					<Text
						style={[styles.tabText, tab === 'All' && styles.selectedTabText]}
					>
						{tab === 'Recipients' ? selectedRecipientName : tab}
					</Text>
					{tab === 'Recipients' && (
						<MaterialIcons
							name="filter-list"
							size={16}
							color={selectedRecipient ? '#4B6BFB' : '#666'}
							style={styles.filterIcon}
						/>
					)}
				</TouchableOpacity>
			))}

			{/* Dialog chọn recipient */}
			<Modal
				visible={showRecipientModal}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setShowRecipientModal(false)}
			>
				<TouchableWithoutFeedback onPress={() => setShowRecipientModal(false)}>
					<View style={styles.modalOverlay}>
						<TouchableWithoutFeedback>
							<View style={styles.modalContent}>
								<Text style={styles.modalTitle}>Select Recipient</Text>
								<FlatList
									data={recipients}
									keyExtractor={(item) => item.id}
									renderItem={({ item }) => (
										<TouchableOpacity
											style={[
												styles.option,
												item.id === selectedRecipient && styles.activeOption,
											]}
											onPress={() => {
												onSelectRecipient(item.id);
												setShowRecipientModal(false);
											}}
										>
											<Text
												style={[
													styles.optionText,
													item.id === selectedRecipient &&
														styles.activeOptionText,
												]}
											>
												{item.name}
											</Text>
										</TouchableOpacity>
									)}
								/>
								<TouchableOpacity
									style={styles.option}
									onPress={() => {
										onSelectRecipient(null);
										setShowRecipientModal(false);
									}}
								>
									<Text style={styles.optionText}>Clear Selection</Text>
								</TouchableOpacity>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
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
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: 'transparent',
	},
	selectedTab: {
		backgroundColor: '#e8eeff',
	},
	activeRecipientTab: {
		borderColor: '#4B6BFB',
		borderWidth: 1,
	},
	tabText: {
		color: '#666',
		fontSize: 14,
	},
	selectedTabText: {
		color: '#4B6BFB',
	},
	filterIcon: {
		marginLeft: 4,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 8,
		padding: 16,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center',
	},
	option: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#E0E0E0',
	},
	activeOption: {
		backgroundColor: '#e8eeff',
	},
	optionText: {
		fontSize: 16,
		color: '#333',
		textAlign: 'center',
	},
	activeOptionText: {
		color: '#4B6BFB',
	},
	searchInput: {
		height: 50,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: '#E0E0E0',
		borderRadius: 8,
		fontSize: 16,
		color: '#333',
		backgroundColor: 'white',
	},
});
