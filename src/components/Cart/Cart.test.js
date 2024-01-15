import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './Cart';

const mockStore = configureStore();

const initialState = {
  data: {
    data: [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 15 },
    ],
  },
  cart: {
    items: {
      1: 2,
    },
  },
};

const store = mockStore(initialState);

test('Cart component renders correctly and handles actions', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );

  expect(getByText('Product 1')).toBeInTheDocument();
  expect(getByText('Product 2')).toBeInTheDocument();
  expect(getByText('20 $')).toBeInTheDocument(); // 2 items * $10 price

  fireEvent.click(getByText('-'));
  expect(store.getActions()).toEqual([{ type: 'cart/removeItem', payload: initialState.data.data[0] }]);

  fireEvent.click(getByText('+'));
  expect(store.getActions()).toEqual([{ type: 'cart/removeItem', payload: initialState.data.data[0] }, { type: 'cart/addItem', payload: initialState.data.data[0] }]);
});
