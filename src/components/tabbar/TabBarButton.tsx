import { Pressable, StyleSheet, Text } from 'react-native';

export interface TabBarButtonProps {
	label: string;
	isFocused: boolean;
	onPress: () => void;
	onLongPress: () => void;
	tabBarIcon?: (props: {
		focused: boolean;
		color: string;
		size: number;
	}) => React.ReactNode;
	tabBarActiveTintColor: string;
	tabBarInactiveTintColor: string;
}

const TabBarButton = ({
	label,
	isFocused,
	onPress,
	onLongPress,
	tabBarIcon,
	tabBarActiveTintColor,
	tabBarInactiveTintColor,
}: TabBarButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			onLongPress={onLongPress}
			android_ripple={null}
			style={[styles.tab, isFocused && styles.activeTab]}
		>
			{tabBarIcon &&
				tabBarIcon({
					color: isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor,
					size: 24,
					focused: isFocused,
				})}

			<Text
				style={[
					{
						color: isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor,
					},
					styles.tabText,
					isFocused && styles.activeTabText,
				]}
			>
				{label}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 6,
		paddingBottom: 6,
		borderRadius: 16,
	},
	tabText: {
		fontSize: 12,
		marginTop: 4,
	},
	activeTab: {
		backgroundColor: '#e6f0ff',
	},
	activeTabText: {
		color: '#4B6BFB',
		fontWeight: 'bold',
	},
});

export default TabBarButton;
