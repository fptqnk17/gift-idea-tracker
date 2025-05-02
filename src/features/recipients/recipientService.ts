import { CreateRecipientDTO, Recipient } from '@/features/recipients/types';
import supabase from '@/services/supabaseClient';

export const fetchRecipients = async (): Promise<Recipient[]> => {
	const { data, error } = await supabase.from('recipients').select('*');
	if (error) throw error;
	return data as Recipient[];
};

export const addRecipient = async (
	recipient: CreateRecipientDTO,
): Promise<Recipient> => {
	const { data, error } = await supabase
		.from('recipients')
		.insert([recipient])
		.single();
	if (error) throw error;
	return data as Recipient;
};

export const deleteRecipient = async (id: string): Promise<void> => {
	const { error } = await supabase.from('recipients').delete().eq('id', id);
	if (error) throw error;
};

export const updateRecipient = async (
	id: string,
	updates: Partial<CreateRecipientDTO>,
): Promise<Recipient> => {
	const { data, error } = await supabase
		.from('recipients')
		.update(updates)
		.eq('id', id)
		.single();

	if (error) throw error;

	return data as Recipient;
};

export const findRecipientById = async (id: number): Promise<string | null> => {
	const { data, error } = await supabase
		.from('recipients')
		.select('name')
		.eq('id', id)
		.single();

	if (error) {
		console.error('Error fetching recipient:', error);
		return null;
	}

	return data?.name || null;
};
