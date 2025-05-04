import rootReducer from '@/redux/rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    // Check that the root state has the expected structure with both reducers
    expect(state).toHaveProperty('gifts');
    expect(state).toHaveProperty('recipients');
  });

  it('should handle actions for the gifts slice', () => {
    // Initial state that would be provided by the store
    const initialState = {
      gifts: {
        gifts: [],
        loading: false,
        error: null
      },
      recipients: {
        recipients: [],
        loading: false,
        error: null
      }
    };

    // Dispatch a gifts-specific action
    const state = rootReducer(initialState, { 
      type: 'gifts/addGift/fulfilled',
      payload: { 
        id: '1', 
        title: 'Test Gift', 
        image: 'test.jpg', 
        price: 50, 
        recipient: '1', 
        selectedDate: '2025-05-01' 
      }
    });

    // The gifts slice should have updated
    expect(state.gifts.gifts).toHaveLength(1);
    expect(state.gifts.gifts[0].title).toBe('Test Gift');
    
    // The recipients slice should remain unchanged
    expect(state.recipients).toEqual(initialState.recipients);
  });

  it('should handle actions for the recipients slice', () => {
    // Initial state
    const initialState = {
      gifts: {
        gifts: [],
        loading: false,
        error: null
      },
      recipients: {
        recipients: [],
        loading: false,
        error: null
      }
    };

    // Dispatch a recipients-specific action
    const state = rootReducer(initialState, { 
      type: 'recipients/addRecipient/fulfilled',
      payload: { 
        id: '1', 
        name: 'Test Recipient', 
        image: 'test.jpg',
        budget: 100,
        spent: 0
      }
    });

    // The recipients slice should have updated
    expect(state.recipients.recipients).toHaveLength(1);
    expect(state.recipients.recipients[0].name).toBe('Test Recipient');
    
    // The gifts slice should remain unchanged
    expect(state.gifts).toEqual(initialState.gifts);
  });
});