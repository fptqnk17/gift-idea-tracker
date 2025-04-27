declare module 'expo-fast-image' {
	import { ImageProps } from 'react-native';

	interface FastImageProps extends ImageProps {
		cacheKey?: string;
		placeholder?: any;
		contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
	}

	const FastImage: React.FC<FastImageProps>;

	export default FastImage;
}
