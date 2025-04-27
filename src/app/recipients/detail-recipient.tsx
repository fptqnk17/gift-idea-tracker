import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { Recipient } from '@/models/Recipient';

const DetailRecipientScreen = () => {
  const router = useRouter();
  const { id, image, name, budget, spent, description } = useLocalSearchParams() as unknown as Recipient;

  // Handle edit action
  const handleEdit = () => {
    router.push({
      pathname: '/recipients/edit-recipient',
      params: {
        id,
        image,
        name,
        budget,
        spent,
        description,
      },
    });
  };

  // Handle delete action
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete the recipient "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log(`Delete action triggered for ID: ${id}`),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.budget}>Budget: ${budget}</Text>
      <Text style={styles.spent}>Spent: ${spent}</Text>

      {description && (
        <Text style={styles.description}>{description}</Text>
      )}

      {/* Action Buttons: Edit and Delete */}
      <View style={styles.actions}>
				<Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
        <Pressable style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
  },
  budget: {
    fontSize: 18,
    color: '#666666',
    marginTop: 8,
  },
  spent: {
    fontSize: 18,
    color: '#666666',
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginTop: 12,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 24,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#ffa200',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF4D4F',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailRecipientScreen;
