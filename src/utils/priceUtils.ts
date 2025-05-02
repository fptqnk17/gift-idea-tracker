/**
 * Formats a number into a price string with commas as thousand separators.
 * @param value - The number to format.
 * @returns The formatted price string.
 */
export const formatPrice = (value: number): string => {
	return value.toLocaleString('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};
