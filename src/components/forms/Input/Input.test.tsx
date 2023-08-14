
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';

describe('Input component', () => {
  it('renders input with label and placeholder', () => {
    const { register } = useForm();

    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        register={register}
      />
    );

    const inputElement = screen.getByTestId('input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('data-test-label', 'Username');
    expect(inputElement).toHaveAttribute('data-test-placeholder', 'Enter your username');
  });

  it('renders an icon when iconName is provided', () => {
    const { register } = useForm();

    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        iconName="search"
        register={register}
      />
    );

    const iconElement = screen.getByTestId('input-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('renders a required indicator when required prop is true', () => {
    const { register } = useForm();

    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        required={true}
        register={register}
      />
    );

    const requiredIndicator = screen.getByTestId('input-required');
    expect(requiredIndicator).toBeInTheDocument();
  });

  it('renders an error message when error is provided', () => {
    const { register } = useForm();

    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        error="Username is required"
        register={register}
      />
    );

    const errorMessage = screen.getByText('Username is required');
    expect(errorMessage).toBeInTheDocument();
  });
});
