import { fireEvent, render } from '@testing-library/react-native';

import RecipientCard from '@/components/utils/RecipientCard';

describe('RecipientCard Component', () => {
	it('should render recipient details correctly', () => {
		const recipient = { id: 1, name: 'John Doe', giftCount: 3 };
		const { getByText } = render(<RecipientCard recipient={recipient} />);
		expect(getByText('John Doe')).toBeTruthy();
		expect(getByText('3 Gifts')).toBeTruthy();
	});

	it('should trigger onPress when the card is clicked', () => {
		const mockOnPress = jest.fn();
		const recipient = { id: 1, name: 'John Doe', giftCount: 3 };
		const { getByText } = render(
			<RecipientCard recipient={recipient} onPress={mockOnPress} />,
		);
		fireEvent.press(getByText('John Doe'));
		expect(mockOnPress).toHaveBeenCalledWith(recipient);
	});
});
