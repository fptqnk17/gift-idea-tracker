import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as giftService from '@/features/gifts/giftService';
import { CreateGiftDTO, GiftIdea, GiftState } from '@/features/gifts/types';

const initialState: GiftState = {
	gifts: [],
	loading: false,
	error: null,
};

export const fetchGifts = createAsyncThunk(
	'gifts/fetchGifts',
	async (_, { rejectWithValue }) => {
		try {
			return await giftService.fetchGifts();
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const addGift = createAsyncThunk(
	'gifts/addGift',
	async (gift: CreateGiftDTO, { rejectWithValue }) => {
		try {
			return await giftService.addGift(gift);
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const deleteGift = createAsyncThunk(
	'gifts/deleteGift',
	async (id: string, { rejectWithValue }) => {
		try {
			await giftService.deleteGift(id);
			return id;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

// Thêm action updateGift
export const updateGift = createAsyncThunk(
	'gifts/updateGift',
	async (gift: Partial<GiftIdea>, { rejectWithValue }) => {
		try {
			return await giftService.updateGift(gift);
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

const giftSlice = createSlice({
	name: 'gifts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Fetch Gifts
			.addCase(fetchGifts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchGifts.fulfilled,
				(state, action: PayloadAction<GiftIdea[]>) => {
					state.loading = false;
					state.gifts = action.payload;
				},
			)
			.addCase(fetchGifts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Add Gift
			.addCase(addGift.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addGift.fulfilled, (state, action: PayloadAction<GiftIdea>) => {
				state.loading = false;
				state.gifts.push(action.payload);
			})
			.addCase(addGift.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Delete Gift
			.addCase(deleteGift.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteGift.fulfilled, (state, action: PayloadAction<string>) => {
				state.loading = false;
				state.gifts = state.gifts.filter((gift) => gift.id !== action.payload);
			})
			.addCase(deleteGift.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})

			// Update Gift
			.addCase(updateGift.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				updateGift.fulfilled,
				(state, action: PayloadAction<GiftIdea>) => {
					state.loading = false;
					const index = state.gifts.findIndex(
						(gift) => gift.id === action.payload.id,
					);
					if (index !== -1) {
						state.gifts[index] = action.payload;
					}
				},
			)
			.addCase(updateGift.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default giftSlice.reducer;
