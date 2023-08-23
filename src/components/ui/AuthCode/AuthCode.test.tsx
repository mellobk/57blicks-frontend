import { render, screen, fireEvent } from "@testing-library/react";
import { AuthenticateCode } from "./AuthCode"; // Update the import path accordingly

describe("AuthenticateCode", () => {
	test("calls handleOnChange when input changes", () => {
		const handleOnChangeMock = jest.fn();
		const title = "Authentication Code";
		const required = true;

		render(
			<AuthenticateCode
				handleOnChange={handleOnChangeMock}
				title={title}
				required={required}
			/>
		);

		// Find the input element
		const inputElement = screen.getByRole("textbox");

		// Simulate input change
		fireEvent.change(inputElement, { target: { value: "123456" } });

		// Expect handleOnChange to be called with the input value
		expect(handleOnChangeMock).toHaveBeenCalledWith("123456");
	});

	// You can add more test cases here
});
