import reducer, {
	addGift,
	deleteGift,
	updateGift,
} from '@/features/gifts/giftSlice';

describe('giftSlice', () => {
	const initialState = {
		gifts: [],
		loading: false,
		error: null
	};

	it('should return the initial state', () => {
		expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
	});

	it('should set loading to true when addGift.pending', () => {
		const action = { type: addGift.pending.type };
		const state = reducer(initialState, action);
		expect(state.loading).toBe(true);
		expect(state.error).toBeNull();
	});

	it('should add gift when addGift.fulfilled', () => {
		const newGift = { 
			id: '1', 
			title: 'Gift 1', 
			image: 'https://example.com/gift1.jpg',
			price: 20,
			recipient: '1',
			selectedDate: '2025-05-01'
		};
		const action = { type: addGift.fulfilled.type, payload: newGift };
		const state = reducer(initialState, action);
		expect(state.loading).toBe(false);
		expect(state.gifts).toHaveLength(1);
		expect(state.gifts[0]).toEqual(newGift);
	});

	it('should remove gift when deleteGift.fulfilled', () => {
		const startState = { 
			...initialState,
			gifts: [{ 
				id: '1', 
				title: 'Gift 1', 
				image: 'https://example.com/gift1.jpg',
				price: 20,
				recipient: '1',
				selectedDate: '2025-05-01'
			}] 
		};
		const action = { type: deleteGift.fulfilled.type, payload: '1' };
		const state = reducer(startState, action);
		expect(state.gifts).toHaveLength(0);
	});

	it('should update gift when updateGift.fulfilled', () => {
		const startState = { 
			...initialState,
			gifts: [{ 
				id: '1', 
				title: 'Gift 1', 
				image: 'https://example.com/gift1.jpg',
				price: 20,
				recipient: '1',
				selectedDate: '2025-05-01'
			}] 
		};
		const updatedGift = { 
			id: '1', 
			title: 'Updated Gift', 
			image: 'https://example.com/gift1.jpg',
			price: 25,
			recipient: '1',
			selectedDate: '2025-05-01'
		};
		const action = { type: updateGift.fulfilled.type, payload: updatedGift };
		const state = reducer(startState, action);
		expect(state.gifts[0]).toEqual(updatedGift);
	});
});
