import { Stack } from 'expo-router';

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen
				name="edit-recipient"
				options={{ title: 'Edit Recipient' }}
			/>
			<Stack.Screen name="add-recipient" options={{ title: 'Add Recipient' }} />
			<Stack.Screen
				name="detail-recipient"
				options={{ title: 'Recipient Detail' }}
			/>
		</Stack>
	);
};

export default Layout;
