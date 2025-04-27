import React from 'react';
import { View, Text, StyleSheet, Image, Switch } from 'react-native';

const CalendarIntegration = () => {
  const [googleEnabled, setGoogleEnabled] = React.useState(false);
  const [appleEnabled, setAppleEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Calendar Integration</Text>
      <View style={styles.integrationItem}>
        <Image 
          source={{ uri: 'https://www.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_31_2x.png' }}
          style={styles.calendarIcon}
        />
        <Text style={styles.integrationText}>Connect with Google Calendar</Text>
        <Switch
          value={googleEnabled}
          onValueChange={setGoogleEnabled}
          trackColor={{ false: '#767577', true: '#4285F4' }}
        />
      </View>
			<View style={styles.integrationItem}>
				<Image 
					source={{ uri: 'https://help.apple.com/assets/65D689DF13D1B1E17703916F/65D689E0D302CF88600FDD25/en_US/941b3852f089696217cabe420c7a459f.png' }}
					style={styles.calendarIcon}
				/>
				<Text style={styles.integrationText}>Connect with Apple Calendar</Text>
				<Switch
					value={appleEnabled}
					onValueChange={setAppleEnabled}
					trackColor={{ false: '#767577', true: '#007AFF' }}
				/>
			</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  integrationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarIcon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  integrationText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
});

export default CalendarIntegration;
