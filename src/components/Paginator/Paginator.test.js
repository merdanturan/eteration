import React from 'react';
import { render, screen } from '@testing-library/react';
import Paginator from './Paginator';

describe('Paginator Component', () => {
  it('renders with default props', () => {
    const mockOnChange = jest.fn();

    render(
      <Paginator
        totalData={100}
        onChange={mockOnChange}
      />
    );

    const paginationElement = screen.getByRole('pagination');
    expect(paginationElement).toBeInTheDocument();

    expect(paginationElement).toHaveAttribute('defaultcurrent', '1');
    expect(paginationElement).toHaveAttribute('total', '100');
    expect(paginationElement).toHaveAttribute('defaultpagesize', '12');
    expect(paginationElement).toHaveAttribute('current', '1');
    expect(paginationElement).toHaveAttribute('pagesizeoptions', '[12]');
    expect(paginationElement).toHaveAttribute('hideonsinglepage');

    const nextButton = screen.getByLabelText('Next Page');
    nextButton.click();
    expect(mockOnChange).toHaveBeenCalled();
  });

});
