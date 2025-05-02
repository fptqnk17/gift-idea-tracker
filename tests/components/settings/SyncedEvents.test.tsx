import { render, fireEvent } from '@testing-library/react-native';
import SyncedEvents from '@/components/settings/SyncedEvents';

describe('SyncedEvents Component', () => {
  it('should render a list of synced events', () => {
    const events = [
      { id: 1, name: 'Event 1', date: '2025-05-01', synced: true },
      { id: 2, name: 'Event 2', date: '2025-05-03', synced: false },
    ];
    const { getByText } = render(<SyncedEvents events={events} />);
    expect(getByText('Event 1')).toBeTruthy();
    expect(getByText('Event 2')).toBeTruthy();
  });

  it('should refresh events on button press', () => {
    const events = [
      { id: 1, name: 'Event 1', date: '2025-05-01', synced: true },
      { id: 2, name: 'Event 2', date: '2025-05-03', synced: false },
    ];
    const mockRefreshEvents = jest.fn();
    const { getByText } = render(<SyncedEvents events={events} />);
    fireEvent.press(getByText('Refresh Events'));
    expect(mockRefreshEvents).toHaveBeenCalled();
  });
});
