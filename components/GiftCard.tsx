import { View, Text, Image, StyleSheet } from 'react-native';

interface GiftCardProps {
  image: string;
  title: string;
  description: string;
  recipient: string;
}

export default function GiftCard({ image, title, description, recipient }: GiftCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.recipient}>For: {recipient}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  recipient: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});