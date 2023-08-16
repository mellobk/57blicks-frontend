import { render, screen, fireEvent } from "@testing-library/react";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput component", () => {
	const mockRegister = jest.fn(); // Mock register function

	it("renders label, placeholder, and icon when provided", () => {
		render(
			<PasswordInput
				label="Password"
				placeHolder="Enter your password"
				register={mockRegister}
				passWordValidations={[
					{ message: "Message 1", complete: true },
					{ message: "Message 2", complete: false },
				]}
			/>
		);

		const labelElement = screen.getByText("Password");
		const placeholderElement = screen.getByPlaceholderText(
			"Enter your password"
		);
		const iconElement = screen.getByTestId("icon");
		const strengthFooterElement = screen.getByTestId("input-strength-footer");
		const errorMessage = screen.queryByText("Message 2"); // Assuming this message is in the strength footer

		expect(labelElement).toBeInTheDocument();
		expect(placeholderElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
		expect(strengthFooterElement).toBeInTheDocument();
		expect(errorMessage).toBeInTheDocument();
	});

	it("toggles password visibility when icon is clicked", () => {
		render(
			<PasswordInput
				label="Password"
				placeHolder="Enter your password"
				register={mockRegister}
			/>
		);

		const inputElement = screen.getByTestId("input");
		const iconElement = screen.getByTestId("icon");

		expect(inputElement).toHaveAttribute("type", "password");

		fireEvent.click(iconElement);

		expect(inputElement).toHaveAttribute("type", "text");
	});

	it("renders without strength footer when passWordValidations is not provided", () => {
		render(
			<PasswordInput
				label="Password"
				placeHolder="Enter your password"
				register={mockRegister}
			/>
		);

		const strengthFooterElement = screen.queryByTestId("input-strength-footer");

		expect(strengthFooterElement).toBeNull();
	});

	it("renders without error and icon when no iconName, required, or error is provided", () => {
		render(
			<PasswordInput
				label="Password"
				placeHolder="Enter your password"
				register={mockRegister}
			/>
		);

		const labelElement = screen.getByText("Password");
		const placeholderElement = screen.getByPlaceholderText(
			"Enter your password"
		);
		const iconElement = screen.getByTestId("icon");
		const strengthFooterElement = screen.queryByTestId("input-strength-footer");
		const errorMessage = screen.queryByText("Message 2"); // Assuming this message is in the strength footer

		expect(labelElement).toBeInTheDocument();
		expect(placeholderElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
		expect(strengthFooterElement).toBeNull();
		expect(errorMessage).toBeNull();
	});

	// Add more test cases as needed...
});
