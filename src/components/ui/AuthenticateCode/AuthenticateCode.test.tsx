import { fireEvent, render, screen } from "@testing-library/react";
import { AuthenticateCode } from "./AuthenticateCode.tsx";

describe("AuthenticateCode", () => {
	test("calls handleOnChange when input changes", () => {
		const handleOnChangeMock = jest.fn();
		const label = "Authentication Code";
		const required = true;

		render(
			<AuthenticateCode
				handleOnChange={handleOnChangeMock}
				label={label}
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
