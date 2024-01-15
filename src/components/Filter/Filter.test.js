import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Filter from './Filter';

describe('Filter component', () => {
  const mockData = ['Option 1', 'Option 2', 'Option 3'];

  it('renders properly', () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn();

    const { getByPlaceholderText, getByLabelText } = render(
      <Filter data={mockData} onChange={handleChange} handleSearch={handleSearch} />
    );

    expect(getByPlaceholderText('Search')).toBeInTheDocument();
    expect(getByLabelText('Option 1')).toBeInTheDocument();
    expect(getByLabelText('Option 2')).toBeInTheDocument();
    expect(getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('calls onChange and handleSearch callbacks when interacting with the component', () => {
    const handleChange = jest.fn();
    const handleSearch = jest.fn();

    const { getByPlaceholderText, getByLabelText } = render(
      <Filter data={mockData} onChange={handleChange} handleSearch={handleSearch} />
    );

    fireEvent.change(getByPlaceholderText('Search'), { target: { value: 'test' } });
    expect(handleSearch).toHaveBeenCalledWith('test');

    fireEvent.click(getByLabelText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith(['Option 1']);
  });
});
