import { renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as React from 'react';
import { AnyAction } from 'redux';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';

// Mock the store
const mockStore = configureMockStore();
const initialState = {
  gifts: {
    gifts: [],
    loading: false,
    error: null
  },
  recipients: {
    recipients: [],
    loading: false,
    error: null
  }
};
const store = mockStore(initialState);

// Use a custom wrapper function that correctly types the Provider props
const wrapper = ({ children }: { children: React.ReactNode }) => {
  // Make TypeScript happy by properly typing the Provider props
  return React.createElement(
    Provider as React.ComponentType<{ store: typeof store; children?: React.ReactNode }>,
    { store },
    children
  );
};

describe('Redux hooks', () => {
  describe('useAppDispatch', () => {
    it('should return a dispatch function', () => {
      const { result } = renderHook(() => useAppDispatch(), { wrapper });
      expect(typeof result.current).toBe('function');
    });

    it('should dispatch an action correctly', () => {
      const { result } = renderHook(() => useAppDispatch(), { wrapper });
      result.current({ type: 'TEST_ACTION' });
      
      const actions = store.getActions();
      expect(actions).toContainEqual({ type: 'TEST_ACTION' });
    });
  });

  describe('useAppSelector', () => {
    it('should select data from the store state', () => {
      const { result } = renderHook(
        () => useAppSelector((state) => state.gifts.gifts),
        { wrapper }
      );
      
      expect(result.current).toEqual([]);
    });
  });
});
