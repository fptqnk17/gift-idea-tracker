import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import FilterTabs from '@/components/utils/FilterTabs';

describe('FilterTabs Component', () => {
	it('should render all tabs', () => {
		const mockProps = {
			selectedTab: 'All',
			onSelectTab: jest.fn(),
			recipients: [
				{ id: '1', name: 'John Doe' },
				{ id: '2', name: 'Jane Smith' },
			],
			selectedRecipient: null,
			onSelectRecipient: jest.fn(),
		};

		const { getByText } = render(<FilterTabs {...mockProps} />);
		expect(getByText('All')).toBeTruthy();
		expect(getByText('Recipients')).toBeTruthy();
	});

	it('should call onSelectTab when a tab is pressed', () => {
		const mockOnSelectTab = jest.fn();
		const mockProps = {
			selectedTab: 'All',
			onSelectTab: mockOnSelectTab,
			recipients: [
				{ id: '1', name: 'John Doe' },
				{ id: '2', name: 'Jane Smith' },
			],
			selectedRecipient: null,
			onSelectRecipient: jest.fn(),
		};

		const { getByText } = render(<FilterTabs {...mockProps} />);
		fireEvent.press(getByText('All'));
		expect(mockOnSelectTab).toHaveBeenCalledWith('All');
	});

	it('should open the recipient modal when the Recipients tab is pressed', () => {
		const mockProps = {
			selectedTab: 'All',
			onSelectTab: jest.fn(),
			recipients: [
				{ id: '1', name: 'John Doe' },
				{ id: '2', name: 'Jane Smith' },
			],
			selectedRecipient: null,
			onSelectRecipient: jest.fn(),
		};

		const { getByText } = render(<FilterTabs {...mockProps} />);
		fireEvent.press(getByText('Recipients'));
		expect(getByText('Select Recipient')).toBeTruthy();
	});
});
