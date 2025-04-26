import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';

export interface TabBarButtonProps {
	label: string;
	isFocused: boolean;
	onPress: () => void;
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
	tabBarIcon,
	tabBarActiveTintColor,
	tabBarInactiveTintColor,
}: TabBarButtonProps) => {
	const scale = useSharedValue(1);

	useEffect(() => {
		scale.value = withSpring(
			typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
			{ duration: 350 },
		);
	}, [scale, isFocused]);

	const animatedTextStyle = useAnimatedStyle(() => {
		const opacity = interpolate(scale.value, [0, 1], [1, 0]);

		return {
			opacity,
		};
	});

	const animatedIconStyle = useAnimatedStyle(() => {
		const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
		const top = interpolate(scale.value, [0, 1], [0, 10]);

		return {
			transform: [{ scale: scaleValue }],
			top,
		};
	});

	return (
		<Pressable
			onPress={onPress}
			android_ripple={null}
			style={[styles.tab, isFocused && styles.activeTab]}
		>
			{tabBarIcon && (
				<Animated.View style={[animatedIconStyle]}>
					{tabBarIcon({
						color: isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor,
						size: 24,
						focused: isFocused,
					})}
				</Animated.View>
			)}

			<Animated.Text
				style={[
					{
						color: isFocused ? tabBarActiveTintColor : tabBarInactiveTintColor,
					},
					styles.tabText,
					isFocused && styles.activeTabText,
					animatedTextStyle,
				]}
			>
				{label}
			</Animated.Text>
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
		backgroundColor: '#E6F0FF',
	},
	activeTabText: {
		color: '#4B6BFB',
		fontWeight: 'bold',
	},
});

export default TabBarButton;
