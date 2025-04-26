import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

import TabBarButton from '@/components/tabbar/TabBarButton';

const BottomTabBar = ({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) => {
	return (
		<View style={styles.container}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label = options.title || route.name;
				const tabBarIcon = options.tabBarIcon;

				if (['_sitemap', '+not-found'].includes(route.name)) return null;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				return (
					<TabBarButton
						key={route.name}
						label={label}
						isFocused={isFocused}
						onPress={onPress}
						tabBarIcon={tabBarIcon}
						tabBarActiveTintColor={options.tabBarActiveTintColor!}
						tabBarInactiveTintColor={options.tabBarInactiveTintColor!}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: 'white',
		paddingVertical: 14,
		borderTopWidth: 2,
		borderTopColor: '#EEEEEE',
		gap: 10,
	},
});

export default BottomTabBar;
