import {
	addRecipient,
	deleteRecipient,
	fetchRecipients,
	findRecipientById,
	updateRecipient,
} from '@/features/recipients/recipientService';
import supabase from '@/services/supabaseClient';

// Mock the entire Supabase client
jest.mock('@/services/supabaseClient', () => {
	// Mock implementation functions
	const mockSingle = jest.fn();
	const mockEq = jest.fn(() => ({ single: mockSingle }));
	const mockSelect = jest.fn(() => ({ eq: mockEq, single: mockSingle }));
	const mockInsert = jest.fn(() => ({ single: mockSingle }));
	const mockUpdate = jest.fn(() => ({ eq: mockEq }));
	const mockDelete = jest.fn(() => ({ eq: mockEq }));
	
	// From function returns an object with all the chainable methods
	const mockFrom = jest.fn(() => ({
		select: mockSelect,
		insert: mockInsert,
		update: mockUpdate,
		delete: mockDelete
	}));

	// Return the mock client
	return {
		from: mockFrom,
		// Expose the internal mocks for test access
		__mocks: {
			from: mockFrom,
			select: mockSelect,
			insert: mockInsert,
			update: mockUpdate,
			delete: mockDelete,
			eq: mockEq,
			single: mockSingle
		}
	};
});

// Get the mocks for easy access in tests
const mocks = (supabase as any).__mocks;

describe('recipientService', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('fetchRecipients', () => {
		it('should fetch all recipients', async () => {
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

			// Setup the mock to return data
			mocks.single.mockResolvedValueOnce({
				data: mockRecipients,
				error: null,
			});

			const result = await fetchRecipients();

			expect(supabase.from).toHaveBeenCalledWith('recipients');
			expect(mocks.select).toHaveBeenCalledWith('*');
			expect(result).toEqual(mockRecipients);
		});

		it('should throw an error when the request fails', async () => {
			const mockError = new Error('Failed to fetch recipients');

			mocks.single.mockResolvedValueOnce({
				data: null,
				error: mockError,
			});

			await expect(fetchRecipients()).rejects.toThrow();
		});
	});

	describe('addRecipient', () => {
		it('should add a new recipient', async () => {
			const newRecipient = {
				name: 'New Person',
				image: 'https://example.com/new-person.jpg',
				budget: 200,
				spent: 0,
			};

			const mockResult = {
				id: '3',
				...newRecipient,
				createdAt: '2025-05-02T12:00:00Z',
			};

			mocks.single.mockResolvedValueOnce({
				data: mockResult,
				error: null,
			});

			const result = await addRecipient(newRecipient);

			expect(supabase.from).toHaveBeenCalledWith('recipients');
			expect(mocks.insert).toHaveBeenCalledWith([newRecipient]);
			expect(mocks.single).toHaveBeenCalled();
			expect(result).toEqual(mockResult);
		});
	});

	describe('deleteRecipient', () => {
		it('should delete a recipient', async () => {
			mocks.eq.mockResolvedValueOnce({ error: null });

			await deleteRecipient('1');

			expect(supabase.from).toHaveBeenCalledWith('recipients');
			expect(mocks.delete).toHaveBeenCalled();
			expect(mocks.eq).toHaveBeenCalledWith('id', '1');
		});
	});

	describe('updateRecipient', () => {
		it('should update a recipient', async () => {
			const updates = {
				name: 'Updated Name',
				budget: 300,
			};

			const mockResult = {
				id: '1',
				name: 'Updated Name',
				image: 'https://example.com/john.jpg',
				budget: 300,
				spent: 50,
			};

			mocks.single.mockResolvedValueOnce({
				data: mockResult,
				error: null,
			});

			const result = await updateRecipient('1', updates);

			expect(supabase.from).toHaveBeenCalledWith('recipients');
			expect(mocks.update).toHaveBeenCalledWith(updates);
			expect(mocks.eq).toHaveBeenCalledWith('id', '1');
			expect(result).toEqual(mockResult);
		});
	});

	describe('findRecipientById', () => {
		it('should find a recipient by id', async () => {
			mocks.single.mockResolvedValueOnce({
				data: { name: 'John Doe' },
				error: null,
			});

			const result = await findRecipientById(1);

			expect(supabase.from).toHaveBeenCalledWith('recipients');
			expect(mocks.select).toHaveBeenCalledWith('name');
			expect(mocks.eq).toHaveBeenCalledWith('id', 1);
			expect(result).toBe('John Doe');
		});

		it('should return null when recipient is not found', async () => {
			mocks.single.mockResolvedValueOnce({
				data: null,
				error: new Error('Not found'),
			});

			const result = await findRecipientById(999);

			expect(result).toBeNull();
		});
	});
});
