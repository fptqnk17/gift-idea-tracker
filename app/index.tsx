import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterTabs from '../components/FilterTabs';
import GiftCard from '../components/GiftCard';
import BottomTabs from '../components/BottomTabs';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState('All');

  const giftIdeas = [
    {
      id: 1,
      image: 'https://api.a0.dev/assets/image?text=gift%20box%20with%20art%20supplies%20and%20golden%20bow',
      title: 'Creative Art Set',
      description: 'Perfect for budding artists',
      recipient: 'Emily',
    },
    {
      id: 2,
      image: 'https://api.a0.dev/assets/image?text=luxury%20chocolate%20box%20assortment',
      title: 'Gourmet Chocolate Basket',
      description: 'Indulgent treat for any occasion',
      recipient: 'Michael',
    },
    {
      id: 3,
      image: 'https://api.a0.dev/assets/image?text=elegant%20stainless%20steel%20watch',
      title: 'Stainless Steel Watch',
      description: 'Timeless elegance for him',
      recipient: 'Alex',
    },
  ];

  const handleAddGift = () => {
    const navigation = useNavigation();
    navigation.dispatch({ type: 'AddGiftIdea' });

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Gift Ideas</Text>
      <FilterTabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
      <ScrollView style={styles.scrollView}>
        {giftIdeas.map((gift) => (
          <GiftCard
            key={gift.id}
            image={gift.image}
            title={gift.title}
            description={gift.description}
            recipient={gift.recipient}
          />
        ))}
      </ScrollView>
      <BottomTabs />
      <TouchableOpacity style={styles.addButton} onPress={handleAddGift}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    padding: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 80, // Adjust to place above BottomTabs
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});