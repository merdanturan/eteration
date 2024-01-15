import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import Checkout from './Checkout';

const mockStore = configureStore();

describe('Checkout component', () => {
  const initialState = {
    cart: {
      totalPrice: 30,
    },
  };

  it('renders properly', () => {
    const store = mockStore(initialState);

    const { getByText } = render(
      <Provider store={store}>
        <Checkout />
      </Provider>
    );

    expect(getByText('Total Price:')).toBeInTheDocument();
    expect(getByText('30 $')).toBeInTheDocument();
    expect(getByText('Checkout')).toBeInTheDocument();
  });
});
