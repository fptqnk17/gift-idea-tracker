export const formatDate = (dateString: string): string => {
	if (!dateString) return 'Invalid Date';

	const date = new Date(dateString);
	if (isNaN(date.getTime())) return 'Invalid Date';

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};
