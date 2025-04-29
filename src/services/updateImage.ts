import { deleteGiftThumbnail } from '@/services/deleteImage';
import { uploadGiftThumbnail } from '@/services/uploadImage';

/**
 * Updates an image in Supabase storage by deleting the old image and uploading a new one.
 * @param oldImageUrl - The public URL of the old image to delete.
 * @param newImageUri - The URI of the new image to upload.
 * @param bucketName - The name of the Supabase storage bucket (default: 'gift-thumbnail').
 * @returns The public URL of the new image.
 */
export const updateGiftThumbnail = async (
	oldImageUrl: string,
	newImageUri: string,
	bucketName: string = 'gift-thumbnail',
): Promise<string> => {
	try {
		if (oldImageUrl) {
			await deleteGiftThumbnail(oldImageUrl, bucketName);
		}

		const newImageUrl = await uploadGiftThumbnail(newImageUri, bucketName);

		return newImageUrl;
	} catch (error) {
		console.error('Error updating image:', error);
		throw new Error('Failed to update image');
	}
};
