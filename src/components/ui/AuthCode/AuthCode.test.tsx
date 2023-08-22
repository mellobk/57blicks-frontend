
import { render, fireEvent, } from '@testing-library/react';
import Button from './AuthCode'; // Assuming the Button component is in a file named Button.js

describe('Button Component', () => {
  test('renders correctly with text', () => {
    const onClickMock = jest.fn();

    const { getByText, } = render(
      <Button text="Click Me" onClick={onClickMock} />,
    );

    const buttonElement = getByText('Click Me',);
    fireEvent.click(buttonElement,);

    expect(buttonElement,).toBeInTheDocument();
    expect(onClickMock,).toHaveBeenCalledTimes(1,);
  },);

  // Add more test cases for different scenarios if needed
},);