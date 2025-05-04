import { CreateGiftDTO, GiftIdea } from '@/features/gifts/types';
import supabase from '@/services/supabaseClient';

export const fetchGifts = async (): Promise<GiftIdea[]> => {
	const { data, error } = await supabase.from('gifts').select('*');
	if (error) throw error;
	return data as GiftIdea[];
};

export const addGift = async (gift: CreateGiftDTO): Promise<GiftIdea> => {
	const { data, error } = await supabase.from('gifts').insert([gift]).single();
	if (error) throw error;
	return data as GiftIdea;
};

export const deleteGift = async (id: string): Promise<boolean> => {
	const { error } = await supabase.from('gifts').delete().eq('id', id);
	if (error) throw error;
	return true;
};

export const updateGift = async (
	gift: Partial<GiftIdea>,
): Promise<GiftIdea> => {
	const { data, error } = await supabase
		.from('gifts')
		.update(gift)
		.eq('id', gift.id)
		.select('*')
		.single();

	if (error) {
		console.error('Supabase updateGift error:', error);
		throw error;
	}

	console.log('Supabase updateGift response:', data);
	return data as GiftIdea;
};
