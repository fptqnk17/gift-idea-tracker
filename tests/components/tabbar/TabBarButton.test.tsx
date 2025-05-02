import { fireEvent, render } from '@testing-library/react-native';

import TabBarButton from '@/components/tabbar/TabBarButton';

describe('TabBarButton Component', () => {
	it('should render the button with the correct label', () => {
		const mockProps = {
			label: 'Home',
			isFocused: false,
			onPress: jest.fn(),
			tabBarActiveTintColor: '#4B6BFB',
			tabBarInactiveTintColor: '#666',
		};

		const { getByText } = render(<TabBarButton {...mockProps} />);
		expect(getByText('Home')).toBeTruthy();
	});

	it('should trigger onPress when the button is clicked', () => {
		const mockOnPress = jest.fn();
		const mockProps = {
			label: 'Home',
			isFocused: false,
			onPress: mockOnPress,
			tabBarActiveTintColor: '#4B6BFB',
			tabBarInactiveTintColor: '#666',
		};

		const { getByText } = render(<TabBarButton {...mockProps} />);
		fireEvent.press(getByText('Home'));
		expect(mockOnPress).toHaveBeenCalled();
	});
});
