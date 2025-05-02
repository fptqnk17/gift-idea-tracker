import { fireEvent, render } from '@testing-library/react-native';

import CalendarIntegration from '@/components/settings/CalendarIntegration';

describe('CalendarIntegration Component', () => {
	it('should render the calendar integration button', () => {
		const { getByText } = render(<CalendarIntegration />);
		expect(getByText('Integrate Calendar')).toBeTruthy();
	});

	it('should trigger calendar integration on button press', () => {
		const mockIntegrateCalendar = jest.fn();
		const { getByText } = render(
			<CalendarIntegration onIntegrate={mockIntegrateCalendar} />,
		);
		fireEvent.press(getByText('Integrate Calendar'));
		expect(mockIntegrateCalendar).toHaveBeenCalled();
	});
});
