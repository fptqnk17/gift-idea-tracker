import supabase from '@/services/supabaseClient';

/**
 * Deletes an image from Supabase storage based on its public URL.
 * @param imageUrl - The public URL of the image to delete.
 * @param bucketName - The name of the Supabase storage bucket (default: 'gift-thumbnail').
 * @throws Will throw an error if the deletion fails.
 */
export const deleteGiftThumbnail = async (
	imageUrl: string,
	bucketName: string = 'gift-thumbnail',
): Promise<void> => {
	try {
		const fileName = imageUrl.split('/').pop();
		if (!fileName) {
			console.error('Invalid image URL');
			throw new Error('Invalid image URL');
		}

		const { error } = await supabase.storage
			.from(bucketName)
			.remove([fileName]);

		if (error) {
			console.error('Error deleting file from Supabase:', error.message);
			throw error;
		}
	} catch (error) {
		console.error('Error deleting image:', error);
		throw new Error('Failed to delete image');
	}
};
