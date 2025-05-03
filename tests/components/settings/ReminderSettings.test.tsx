import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import ReminderSettings from '@/components/settings/ReminderSettings';

describe('ReminderSettings Component', () => {
	it('should render the reminder toggle', () => {
		const { getByText } = render(<ReminderSettings />);
		expect(getByText('Enable Reminders')).toBeTruthy();
	});

	it('should toggle reminders on switch press', () => {
		const mockToggleReminders = jest.fn();
		const { getByText } = render(
			<ReminderSettings onToggle={mockToggleReminders} />,
		);
		fireEvent.press(getByText('Enable Reminders'));
		expect(mockToggleReminders).toHaveBeenCalled();
	});
});
