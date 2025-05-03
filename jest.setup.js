// Jest setup file

// Mock global functions or modules if needed
jest.mock('react-native', () => {
	const ReactNative = jest.requireActual('react-native');
	return {
		...ReactNative,
		ActionSheetIOS: {
			showActionSheetWithOptions: jest.fn(),
		},
	};
});

// Add any other global mocks or configurations here
