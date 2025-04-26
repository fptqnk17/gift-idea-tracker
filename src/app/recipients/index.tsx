import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllRecipientsScreen = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Text>All Recipients Screen</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
	},
});

export default AllRecipientsScreen;
