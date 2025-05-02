import * as FileSystem from 'expo-file-system';

import supabase from '@/services/supabaseClient';

export const uploadGiftThumbnail = async (
	uri: string,
	bucketName: string = 'gift-thumbnail',
): Promise<string> => {
	try {
		const fileName = uri.split('/').pop();
		if (!fileName) {
			console.error('Invalid file name');
			throw new Error('Invalid file name');
		}

		const fileInfo = await FileSystem.readAsStringAsync(uri, {
			encoding: FileSystem.EncodingType.Base64,
		});

		const arrayBuffer = Uint8Array.from(atob(fileInfo), (c) =>
			c.charCodeAt(0),
		).buffer;

		const { data, error } = await supabase.storage
			.from(bucketName)
			.upload(fileName, arrayBuffer, {
				contentType: 'image/jpeg',
				cacheControl: '3600',
				upsert: true,
			});

		if (error) {
			console.error('Error uploading file to Supabase:', error.message);
			throw error;
		}

		const { data: publicUrlData } = supabase.storage
			.from(bucketName)
			.getPublicUrl(fileName);

		if (!publicUrlData?.publicUrl) {
			console.error('Failed to retrieve public URL');
			throw new Error('Failed to retrieve public URL');
		}

		return publicUrlData.publicUrl;
	} catch (error) {
		console.error('Error uploading image:', error);
		throw new Error('Failed to upload image');
	}
};
