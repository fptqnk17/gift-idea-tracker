import { deleteImageFromBucket } from '@/services/deleteImage';
import { uploadFileToBucket } from '@/services/uploadImage';

/**
 * Updates an image in Supabase storage by deleting the old image and uploading a new one.
 * @param oldImageUrl - The public URL of the old image to delete.
 * @param newImageUri - The URI of the new image to upload.
 * @param bucketName - The name of the Supabase storage bucket.
 * @returns The public URL of the new image.
 */
export const updateImageInBucket = async (
	oldImageUrl: string,
	newImageUri: string,
	bucketName: string,
): Promise<string> => {
	try {
		if (oldImageUrl) {
			await deleteImageFromBucket(oldImageUrl, bucketName);
		}

		const newImageUrl = await uploadFileToBucket(newImageUri, bucketName);

		return newImageUrl;
	} catch (error) {
		console.error('Error updating image:', error);
		throw new Error('Failed to update image');
	}
};

/**
 * Updates a gift thumbnail in Supabase storage.
 * @param oldImageUrl - The public URL of the old gift thumbnail to delete.
 * @param newImageUri - The URI of the new gift thumbnail to upload.
 * @param bucketName - The name of the Supabase storage bucket (default: 'gift-thumbnail').
 * @returns The public URL of the new gift thumbnail.
 */
export const updateGiftThumbnail = async (
	oldImageUrl: string,
	newImageUri: string,
	bucketName: string = 'gift-thumbnail',
): Promise<string> => {
	return updateImageInBucket(oldImageUrl, newImageUri, bucketName);
};

/**
 * Updates a recipient avatar in Supabase storage.
 * @param oldImageUrl - The public URL of the old recipient avatar to delete.
 * @param newImageUri - The URI of the new recipient avatar to upload.
 * @param bucketName - The name of the Supabase storage bucket (default: 'recipient-avatar').
 * @returns The public URL of the new recipient avatar.
 */
export const updateRecipientAvatar = async (
	oldImageUrl: string,
	newImageUri: string,
	bucketName: string = 'recipient-avatar',
): Promise<string> => {
	return updateImageInBucket(oldImageUrl, newImageUri, bucketName);
};
