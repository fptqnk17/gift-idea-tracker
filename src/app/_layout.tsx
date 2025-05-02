import store from '../redux/store';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';

import BottomTabBar from '@/components/tabbar/BottomTabBar';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<Tabs
					tabBar={(props) => <BottomTabBar {...props} />}
					screenOptions={{
						headerShown: false,
						tabBarActiveTintColor: '#4B6BFB',
						tabBarInactiveTintColor: '#666666',
					}}
				>
					<Tabs.Screen
						name="recipients"
						options={{
							title: 'Recipients',
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="people-outline" size={size} color={color} />
							),
						}}
					/>
					<Tabs.Screen
						name="(gifts)"
						options={{
							title: 'Home',
							tabBarIcon: ({ color, size }) => (
								<AntDesign name="home" size={size} color={color} />
							),
						}}
					/>
					<Tabs.Screen
						name="settings"
						options={{
							title: 'Settings',
							tabBarIcon: ({ color, size }) => (
								<AntDesign name="setting" size={size} color={color} />
							),
						}}
					/>
				</Tabs>
			</View>
		</Provider>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
};

export default RootLayout;
