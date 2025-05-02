import reducer, {
	addRecipient,
	deleteRecipient,
	fetchRecipients,
	updateRecipient,
} from '@/features/recipients/recipientSlice';

describe('recipientSlice', () => {
	const initialState = {
		recipients: [],
		loading: false,
		error: null,
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
			initialState,
		);
	});

	describe('fetchRecipients', () => {
		it('should set loading to true when fetchRecipients.pending', () => {
			const action = { type: fetchRecipients.pending.type };
			const state = reducer(initialState, action);
			expect(state.loading).toBe(true);
			expect(state.error).toBeNull();
		});

		it('should update state with recipients when fetchRecipients.fulfilled', () => {
			const mockRecipients = [
				{
					id: '1',
					name: 'John Doe',
					image: 'https://example.com/john.jpg',
					budget: 100,
					spent: 50,
				},
				{
					id: '2',
					name: 'Jane Smith',
					image: 'https://example.com/jane.jpg',
					budget: 150,
					spent: 75,
				},
			];

			const action = {
				type: fetchRecipients.fulfilled.type,
				payload: mockRecipients,
			};
			const state = reducer(initialState, action);

			expect(state.loading).toBe(false);
			expect(state.recipients).toEqual(mockRecipients);
			expect(state.error).toBeNull();
		});

		it('should set error when fetchRecipients.rejected', () => {
			const action = {
				type: fetchRecipients.rejected.type,
				payload: 'Failed to fetch recipients',
			};
			const state = reducer(initialState, action);

			expect(state.loading).toBe(false);
			expect(state.error).toBe('Failed to fetch recipients');
		});
	});

	describe('addRecipient', () => {
		it('should add recipient to state when addRecipient.fulfilled', () => {
			const mockRecipient = {
				id: '3',
				name: 'New Person',
				image: 'https://example.com/new-person.jpg',
				budget: 200,
				spent: 0,
			};

			const action = {
				type: addRecipient.fulfilled.type,
				payload: mockRecipient,
			};
			const state = reducer(initialState, action);

			expect(state.recipients).toHaveLength(1);
			expect(state.recipients[0]).toEqual(mockRecipient);
		});
	});

	describe('deleteRecipient', () => {
		it('should remove recipient from state when deleteRecipient.fulfilled', () => {
			const startState = {
				...initialState,
				recipients: [
					{
						id: '1',
						name: 'John Doe',
						image: 'https://example.com/john.jpg',
						budget: 100,
						spent: 50,
					},
					{
						id: '2',
						name: 'Jane Smith',
						image: 'https://example.com/jane.jpg',
						budget: 150,
						spent: 75,
					},
				],
			};

			const action = { type: deleteRecipient.fulfilled.type, payload: '1' };
			const state = reducer(startState, action);

			expect(state.recipients).toHaveLength(1);
			expect(state.recipients[0].id).toBe('2');
		});
	});

	describe('updateRecipient', () => {
		it('should set loading to true when updateRecipient.pending', () => {
			const action = { type: updateRecipient.pending.type };
			const state = reducer(initialState, action);
			expect(state.loading).toBe(true);
			expect(state.error).toBeNull();
		});

		it('should update recipient in state when updateRecipient.fulfilled', () => {
			const startState = {
				...initialState,
				recipients: [
					{
						id: '1',
						name: 'John Doe',
						image: 'https://example.com/john.jpg',
						budget: 100,
						spent: 50,
					},
					{
						id: '2',
						name: 'Jane Smith',
						image: 'https://example.com/jane.jpg',
						budget: 150,
						spent: 75,
					},
				],
			};

			const updatedRecipient = {
				id: '1',
				name: 'John Updated',
				image: 'https://example.com/john-updated.jpg',
				budget: 200,
				spent: 75,
			};

			const action = {
				type: updateRecipient.fulfilled.type,
				payload: updatedRecipient,
			};
			const state = reducer(startState, action);

			expect(state.loading).toBe(false);
			expect(state.recipients).toHaveLength(2);
			expect(state.recipients[0]).toEqual(updatedRecipient);
		});

		it('should set error when updateRecipient.rejected', () => {
			const action = {
				type: updateRecipient.rejected.type,
				payload: 'Failed to update recipient',
			};
			const state = reducer(initialState, action);

			expect(state.loading).toBe(false);
			expect(state.error).toBe('Failed to update recipient');
		});
	});
});
