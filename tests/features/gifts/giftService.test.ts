import { addGift, deleteGift, updateGift } from '@/features/gifts/giftService';
import supabase from '@/services/supabaseClient';

jest.mock('@/services/supabaseClient', () => ({
	from: jest.fn(() => ({
		insert: jest.fn(() => ({
			single: jest.fn(() => ({
				data: {
					id: 'mocked-id',
					title: 'Gift 1',
					image: 'https://example.com/gift1.jpg',
					price: 20,
					recipient: '1',
					selectedDate: '2025-05-01',
				},
				error: null,
			})),
		})),
		delete: jest.fn(() => ({
			eq: jest.fn(() => ({
				error: null,
			})),
		})),
		update: jest.fn(() => ({
			eq: jest.fn(() => ({
				select: jest.fn(() => ({
					single: jest.fn(() => ({
						data: {
							id: '1',
							title: 'Updated Gift',
							image: 'https://example.com/gift1.jpg',
							price: 25,
							recipient: '1',
							selectedDate: '2025-05-01',
						},
						error: null,
					})),
				})),
			})),
		})),
	})),
}));

describe('giftService', () => {
	it('should add a gift correctly', async () => {
		const newGift = {
			title: 'Gift 1',
			image: 'https://example.com/gift1.jpg',
			price: 20,
			recipient: '1',
			selectedDate: '2025-05-01',
		};
		const result = await addGift(newGift);
		expect(result).toEqual({
			id: expect.any(String),
			...newGift,
		});
	});

	it('should delete a gift correctly', async () => {
		const giftId = '1'; // Updated to string to match GiftIdea type
		const result = await deleteGift(giftId);
		expect(result).toBe(true);
	});

	it('should update a gift correctly', async () => {
		const updatedGift = {
			id: '1', // Updated to string to match GiftIdea type
			title: 'Updated Gift',
			image: 'https://example.com/gift1.jpg',
			price: 25,
			recipient: '1',
			selectedDate: '2025-05-01',
		};
		const result = await updateGift(updatedGift);
		expect(result).toEqual(updatedGift);
	});
});
