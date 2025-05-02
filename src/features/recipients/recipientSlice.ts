import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as recipientService from '@/features/recipients/recipientService';
import {
	CreateRecipientDTO,
	Recipient,
	RecipientState,
} from '@/features/recipients/types';

const initialState: RecipientState = {
	recipients: [],
	loading: false,
	error: null,
};

export const fetchRecipients = createAsyncThunk(
	'recipients/fetchRecipients',
	async (_, { rejectWithValue }) => {
		try {
			return await recipientService.fetchRecipients();
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const addRecipient = createAsyncThunk(
	'recipients/addRecipient',
	async (recipient: CreateRecipientDTO, { rejectWithValue }) => {
		try {
			return await recipientService.addRecipient(recipient);
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const deleteRecipient = createAsyncThunk(
	'recipients/deleteRecipient',
	async (id: string, { rejectWithValue }) => {
		try {
			await recipientService.deleteRecipient(id);
			return id;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

export const updateRecipient = createAsyncThunk(
	'recipients/updateRecipient',
	async (
		{ id, updates }: { id: string; updates: Partial<CreateRecipientDTO> },
		{ rejectWithValue },
	) => {
		try {
			return await recipientService.updateRecipient(id, updates);
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	},
);

const recipientSlice = createSlice({
	name: 'recipients',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipients.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchRecipients.fulfilled,
				(state, action: PayloadAction<Recipient[]>) => {
					state.loading = false;
					state.recipients = action.payload;
				},
			)
			.addCase(fetchRecipients.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(
				addRecipient.fulfilled,
				(state, action: PayloadAction<Recipient>) => {
					state.recipients.push(action.payload);
				},
			)
			.addCase(
				deleteRecipient.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.recipients = state.recipients.filter(
						(recipient) => recipient.id !== action.payload,
					);
				},
			)
			.addCase(updateRecipient.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				updateRecipient.fulfilled,
				(state, action: PayloadAction<Recipient>) => {
					state.loading = false;
					const index = state.recipients.findIndex(
						(recipient) => recipient.id === action.payload.id,
					);
					if (index !== -1) {
						state.recipients[index] = action.payload;
					}
				},
			)
			.addCase(updateRecipient.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default recipientSlice.reducer;
