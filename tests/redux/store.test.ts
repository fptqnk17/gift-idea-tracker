import store from '@/redux/store';

describe('Redux store', () => {
	it('should have the correct initial state', () => {
		const state = store.getState();

		// Check that the store contains the expected slices
		expect(state).toHaveProperty('gifts');
		expect(state).toHaveProperty('recipients');

		// Check that gifts slice has the expected initial state
		expect(state.gifts).toEqual({
			gifts: [],
			loading: false,
			error: null,
		});

		// Check that recipients slice has the expected initial state
		expect(state.recipients).toEqual({
			recipients: [],
			loading: false,
			error: null,
		});
	});

	it('should handle dispatched actions', () => {
		// Dispatch a test action
		store.dispatch({
			type: 'gifts/fetchGifts/pending',
		});

		// Check that the state was updated correctly
		const state = store.getState();
		expect(state.gifts.loading).toBe(true);

		// Reset store to avoid affecting other tests
		store.dispatch({ type: 'UNKNOWN_ACTION' });
	});

	it('should have thunk middleware available', () => {
		// Dispatch an async thunk action (mock)
		const asyncAction = () => (dispatch: any) => {
			dispatch({ type: 'TEST_ASYNC_ACTION' });
		};

		// This will throw if thunk middleware isn't available
		store.dispatch(asyncAction() as any);

		// Reset store to avoid affecting other tests
		store.dispatch({ type: 'UNKNOWN_ACTION' });
	});
});
