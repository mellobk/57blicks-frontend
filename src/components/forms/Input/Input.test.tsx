import { render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
  it('renders label, placeholder, and icon when provided', () => {
    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        iconName="search"
        register={jest.fn()} // Mock register function
      />
    );

    const labelElement = screen.getByText('Username');
    const placeholderElement = screen.getByPlaceholderText('Enter your username');
    const iconElement = screen.getByTestId('icon');

    expect(labelElement).toBeInTheDocument();
    expect(placeholderElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('renders required indicator when required prop is true', () => {
    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        required={true}
        register={jest.fn()} // Mock register function
      />
    );

    const requiredIndicator = screen.getByText('*');
    expect(requiredIndicator).toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        error="Username is required"
        register={jest.fn()} // Mock register function
      />
    );

    const errorMessage = screen.getByText('Username is required');
    expect(errorMessage).toBeInTheDocument();
  });

  it('does not render icon when iconName is not provided', () => {
    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        register={jest.fn()} // Mock register function
      />
    );

    const iconElement = screen.queryByText('Mocked Icon'); // Use "queryByText" since the icon might not always be present
    expect(iconElement).toBeNull();
  });

  it('renders without error and icon when no iconName, required, or error is provided', () => {
    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        register={jest.fn()} // Mock register function
      />
    );

    const labelElement = screen.getByText('Username');
    const placeholderElement = screen.getByPlaceholderText('Enter your username');
    const iconElement = screen.queryByText('Mocked Icon'); // Use "queryByText" since the icon might not always be present
    const requiredIndicator = screen.queryByText('*'); // Use "queryByText" since the indicator might not always be present

    expect(labelElement).toBeInTheDocument();
    expect(placeholderElement).toBeInTheDocument();
    expect(iconElement).toBeNull();
    expect(requiredIndicator).toBeNull();
  });

  // Add more test cases as needed...
});
