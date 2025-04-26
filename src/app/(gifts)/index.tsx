import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text>Home Screen</Text>
			<Link href="/(gifts)/edit-gift" push>
				Edit Gift
			</Link>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
});

export default HomeScreen;
