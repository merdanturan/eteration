import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sort from './Sort';

describe('Sort component', () => {
  const mockData = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ];

  const handleChange = jest.fn();

  it('renders properly', () => {
    const { getByLabelText } = render(<Sort data={mockData} onChange={handleChange} value="asc" />);

    expect(getByLabelText('Ascending')).toBeInTheDocument();
    expect(getByLabelText('Descending')).toBeInTheDocument();
  });

  it('calls onChange callback when changing sort option', () => {
    const { getByLabelText } = render(<Sort data={mockData} onChange={handleChange} value="asc" />);

    fireEvent.click(getByLabelText('Descending'));
    expect(handleChange).toHaveBeenCalledWith('desc');

    fireEvent.click(getByLabelText('Ascending'));
    expect(handleChange).toHaveBeenCalledWith('asc');
  });
});
