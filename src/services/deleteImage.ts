import supabase from '@/services/supabaseClient';

/**
 * Deletes an image from Supabase storage based on its public URL.
 * @param imageUrl - The public URL of the image to delete.
 * @param bucketName - The name of the Supabase storage bucket.
 * @throws Will throw an error if the deletion fails.
 */
export const deleteImageFromBucket = async (
	imageUrl: string,
	bucketName: string,
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

/**
 * Deletes a gift thumbnail from Supabase storage.
 * @param imageUrl - The public URL of the gift thumbnail to delete.
 * @param bucketName - The name of the Supabase storage bucket (default: 'gift-thumbnail').
 */
export const deleteGiftThumbnail = async (
	imageUrl: string,
	bucketName: string = 'gift-thumbnail',
): Promise<void> => {
	return deleteImageFromBucket(imageUrl, bucketName);
};

/**
 * Deletes a recipient avatar from Supabase storage.
 * @param imageUrl - The public URL of the recipient avatar to delete.
 * @param bucketName - The name of the Supabase storage bucket (default: 'recipient-avatar').
 */
export const deleteRecipientAvatar = async (
	imageUrl: string,
	bucketName: string = 'recipient-avatar',
): Promise<void> => {
	return deleteImageFromBucket(imageUrl, bucketName);
};
