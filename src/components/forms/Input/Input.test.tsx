
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { Input } from './Input';

describe('LoginLayout component', () => {
  it('renders the input with label and placeholder', () => {
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

  it('renders an error message when error prop is true', () => {
    const { register } = useForm();
    
    render(
      <Input
        label="Username"
        placeHolder="Enter your username"
        required={true}
        register={register}
      />
    );

    const errorElement = screen.getByTestId('input-error');
    expect(errorElement).toBeInTheDocument();
  });
});
