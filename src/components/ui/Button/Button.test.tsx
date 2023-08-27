import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
	test("renders correctly with text", () => {
		const onClickMock = jest.fn();

		const { getByText } = render(
			<Button buttonText="Click Me" onClick={onClickMock} />
		);

		const buttonElement = getByText("Click Me");
		fireEvent.click(buttonElement);

		expect(buttonElement).toBeInTheDocument();
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});
});
