import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import BottomTabBar from '@/components/tabbar/BottomTabBar';

const RootLayout = () => {
	return (
		<React.Fragment>
			<StatusBar style="auto" />
			<Tabs
				tabBar={(props) => <BottomTabBar {...props} />}
				screenOptions={{
					// headerShown: false,
					// tabBarStyle: { display: 'none' },
					tabBarActiveTintColor: '#e91e63',
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: 'Home',
						tabBarIcon: ({ color, size }) => (
							<AntDesign name="home" size={size} color={color} />
						),
					}}
				/>
				<Tabs.Screen name="second" options={{ title: 'Settings' }} />
			</Tabs>
		</React.Fragment>
	);
};

export default RootLayout;
