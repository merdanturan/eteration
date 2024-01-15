import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card Component Tests', () => {
  test('renders card component with correct data', () => {
    const mockData = {
      name: 'Test Card',
      img: 'test.jpg',
      type: 'some-type',
      onClick: jest.fn(),
      price: '$10',
      buttonAction: jest.fn(),
    };

    const { getByAltText, getByText } = render(<Card {...mockData} />);

    expect(getByAltText('Avatar')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByText('Test Card')).toBeInTheDocument();

    const button = getByText('Add to Card');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockData.buttonAction).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('Test Card'));
    expect(mockData.onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(getByAltText('Avatar'));
    expect(mockData.onClick).toHaveBeenCalledTimes(2);
  });
});
