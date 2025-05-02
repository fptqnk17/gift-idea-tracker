export interface GiftIdea {
	id: string;
	title: string;
	description?: string;
	image: string;
	price: number;
	recipient: string;
	selectedDate: string;
	createdAt?: string;
}

export interface GiftState {
	gifts: GiftIdea[];
	loading: boolean;
	error: string | null;
}

export interface CreateGiftDTO {
	title: string;
	description?: string;
	image: string;
	price: number;
	recipient: string;
	selectedDate: string;
}
