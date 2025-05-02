export interface Recipient {
	id: string;
	image: string;
	name: string;
	description?: string;
	budget: number;
	spent: number;
	createdAt?: string;
}

export interface RecipientState {
	recipients: Recipient[];
	loading: boolean;
	error: string | null;
}

export interface CreateRecipientDTO {
	image: string;
	name: string;
	description?: string;
	budget: number;
	spent: number;
}
