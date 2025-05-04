module.exports = {
	preset: 'react-native',
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
	},
	transformIgnorePatterns: [
		'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|react-native-reanimated|react-native-gesture-handler)',
	],

	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1', // chỉnh lại nếu bạn dùng alias khác
	},
};
