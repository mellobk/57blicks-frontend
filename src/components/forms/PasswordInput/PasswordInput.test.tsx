
import { render, screen } from '@testing-library/react';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput component', () => {
  it('renders input with label and placeholder', () => {
    render(
      <PasswordInput
        label="Password"
        placeHolder="Enter your password"
        passWordValidations={[{ complete: true }]}
      />
    );

    const inputElement = screen.getByTestId('input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('data-test-label', 'Password');
    expect(inputElement).toHaveAttribute('data-test-placeholder', 'Enter your password');
  });

  it('toggles password visibility on icon click', () => {
    render(
      <PasswordInput
        label="Password"
        placeHolder="Enter your password"
        iconName="closeEye"
        passWordValidations={[{ complete: true }]}
      />
    );

    const iconElement = screen.getByTestId('input-icon');
    const inputElement = screen.getByTestId('input');

    expect(inputElement).toHaveAttribute('type', 'password');

    iconElement.click();

    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('renders password strength validations', () => {
    render(
      <PasswordInput
        label="Password"
        placeHolder="Enter your password"
        iconName="closeEye"
        passWordValidations={[
          { message: 'Must contain at least one number', complete: false },
          { message: 'Must contain at least one special character', complete: true },
        ]}
      />
    );

    const validationElements = screen.getAllByTestId('input-strength-container');
    expect(validationElements).toHaveLength(2);
  });

  it('renders an error message when error is provided', () => {
    render(
      <PasswordInput
        label="Password"
        placeHolder="Enter your password"
        error="Password is required"
        passWordValidations={[{ complete: true }]}
      />
    );

    const errorMessage = screen.getByText('Password is required');
    expect(errorMessage).toBeInTheDocument();
  });
});