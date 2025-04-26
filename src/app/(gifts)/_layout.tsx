import { Stack } from 'expo-router';

const Layout = () => {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="edit-gift" options={{ title: 'Edit Gift' }} />
			<Stack.Screen name="add-gift" options={{ title: 'Add Gift' }} />
			<Stack.Screen name="detail-gift" options={{ title: 'Gift Detail' }} />
		</Stack>
	);
};

export default Layout;
