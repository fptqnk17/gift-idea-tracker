import giftReducer from '../features/gifts/giftSlice';
import recipientReducer from '../features/recipients/recipientSlice';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
	gifts: giftReducer,
	recipients: recipientReducer,
});

export default rootReducer;
