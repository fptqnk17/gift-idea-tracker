import { render } from '@testing-library/react-native';
import BottomTabBar from '@/components/tabbar/BottomTabBar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

describe('BottomTabBar Component', () => {
  it('should render all tabs', () => {
    const mockProps: BottomTabBarProps = {
      state: {
        index: 0,
        routes: [
          { key: 'home', name: 'Home', params: undefined },
          { key: 'recipients', name: 'Recipients', params: undefined },
          { key: 'settings', name: 'Settings', params: undefined },
        ],
        type: 'tab',
        stale: false,
        key: 'tab-key',
        routeNames: ['Home', 'Recipients', 'Settings'],
        history: [],
        preloadedRouteKeys: [],
      },
      descriptors: {
        home: {
          options: { title: 'Home', tabBarIcon: undefined },
          render: jest.fn(),
          route: { key: 'home', name: 'Home', params: undefined },
          navigation: jest.fn() as any,
        },
        recipients: {
          options: { title: 'Recipients', tabBarIcon: undefined },
          render: jest.fn(),
          route: { key: 'recipients', name: 'Recipients', params: undefined },
          navigation: jest.fn() as any,
        },
        settings: {
          options: { title: 'Settings', tabBarIcon: undefined },
          render: jest.fn(),
          route: { key: 'settings', name: 'Settings', params: undefined },
          navigation: jest.fn() as any,
        },
      },
      navigation: {
        emit: jest.fn(),
        navigate: jest.fn(),
        reset: jest.fn(),
        goBack: jest.fn(),
        isFocused: jest.fn(),
        canGoBack: jest.fn(),
        getParent: jest.fn(),
        setParams: jest.fn(),
        getState: jest.fn(),
        dispatch: jest.fn(),
        navigateDeprecated: jest.fn(),
        preload: jest.fn(),
        getId: jest.fn(),
        setStateForNextRouteNamesChange: jest.fn(),
      } as any,
      insets: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    };

    const { getByText } = render(<BottomTabBar {...mockProps} />);
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Recipients')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });
});
