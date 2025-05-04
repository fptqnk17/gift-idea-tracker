import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import GiftCard from '@/components/utils/GiftCard';

describe('GiftCard Component', () => {
	it('should render gift details correctly', () => {
		const mockProps = {
			id: '1', // Updated to string
			image: 'https://example.com/image.jpg',
			title: 'Gift 1',
			description: 'A wonderful gift',
			price: 20,
			recipient: '1',
			selectedDate: '2025-05-01',
		};

		const { getByText } = render(<GiftCard {...mockProps} />);
		expect(getByText('Gift 1')).toBeTruthy();
		expect(getByText('for Loading...')).toBeTruthy();
		expect(getByText('Happening on May 1, 2025')).toBeTruthy();
	});

	it('should trigger onPress when the card is clicked', () => {
		const mockOnPress = jest.fn();
		const mockProps = {
			id: '1', // Updated to string
			image: 'https://example.com/image.jpg',
			title: 'Gift 1',
			description: 'A wonderful gift',
			price: 20,
			recipient: '1',
			selectedDate: '2025-05-01',
			onEdit: mockOnPress,
		};

		const { getByText } = render(<GiftCard {...mockProps} />);
		fireEvent.press(getByText('Gift 1'));
		expect(mockOnPress).toHaveBeenCalled();
	});
});
