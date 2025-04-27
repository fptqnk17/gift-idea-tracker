import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Recipient } from '@/models/Recipient';
import RecipientCard from '@/components/utils/RecipientCard';

const AllRecipientsScreen = () => {
  const router = useRouter();

	const recipients: Recipient[] = [
		{ id: '1', image: 'https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg', name: 'Alex', description: 'Loves outdoor activities and sports.', budget: 2000, spent: 1500 },
		{ id: '2', image: 'https://static.vecteezy.com/system/resources/previews/004/899/833/non_2x/beautiful-girl-with-blue-hair-avatar-of-woman-for-social-network-vector.jpg', name: 'Emily', description: 'Enjoys painting and creative arts.', budget: 2200, spent: 1600 },
		{ id: '3', image: 'https://img.freepik.com/premium-vector/boy-with-blue-hoodie-blue-hoodie-with-hoodie-it_1230457-42660.jpg', name: 'Michael', description: 'A tech enthusiast and gamer.', budget: 3000, spent: 1500 },
		{ id: '4', image: 'https://img.freepik.com/premium-vector/boy-with-hoodie-that-says-hes-boy_1230457-43316.jpg', name: 'Malow', description: 'Passionate about music and instruments.', budget: 1800, spent: 1200 },
	];

  const handleAddRecipient = () => {
    router.push('/recipients/add-recipient');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
          />
        </View>
        <Pressable style={styles.addButton} onPress={handleAddRecipient}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <Text style={styles.title}>All Recipients</Text>

      <ScrollView style={styles.scrollView}>
        {recipients.map((recipient) => (
          <RecipientCard
            key={recipient.id}
            id={recipient.id}
            image={recipient.image}
            name={recipient.name}
						description={recipient?.description}
            budget={recipient.budget}
            spent={recipient.spent}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333333',
  },
  addButton: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#33333',
  },
  scrollView: {
    flex: 1,
  },
});

export default AllRecipientsScreen;
