import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For extended DOM matchers
import { Toggle } from "./Toggle"; // Adjust the import path as needed

describe("Toggle component", () => {
	it("renders unchecked initially", () => {
		const { getByRole } = render(<Toggle />);
		const inputElement = getByRole("checkbox");
		expect(inputElement).not.toBeChecked();
	});

	it('calls "onChecked" when clicked', () => {
		const onCheckedMock = jest.fn();
		const { getByRole } = render(<Toggle onChecked={onCheckedMock} />);
		const inputElement = getByRole("checkbox");

		fireEvent.click(inputElement);

		expect(onCheckedMock).toHaveBeenCalledTimes(1);
	});
});
