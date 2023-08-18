import { render, screen, fireEvent, } from "@testing-library/react";
import { PasswordInput, } from "./PasswordInput";

describe("PasswordInput component", () => {

	it("renders label, placeholder, and icon when provided", () => {
		render(
			<PasswordInput
				title="Password"
				placeholder="Enter your password"
        error="Message 2"
			/>,
		);

		const labelElement = screen.getByText("Password",);
		const placeholderElement = screen.getByPlaceholderText(
			"Enter your password",
		);
		const iconElement = screen.getByTestId("icon",);
		const errorMessage = screen.queryByText("Message 2",); // Assuming this message is in the strength footer

		expect(labelElement,).toBeInTheDocument();
		expect(placeholderElement,).toBeInTheDocument();
		expect(iconElement,).toBeInTheDocument();
		expect(errorMessage,).toBeInTheDocument();
	},);


	it("renders without error and icon when no iconName, required, or error is provided", () => {
		render(
			<PasswordInput title="Password" placeholder="Enter your password" />,
		);

		const labelElement = screen.getByText("Password",);
		const placeholderElement = screen.getByPlaceholderText(
			"Enter your password",
		);
		const iconElement = screen.getByTestId("icon",);
		const strengthFooterElement = screen.queryByTestId("input-strength-footer",);
		const errorMessage = screen.queryByText("Message 2",); // Assuming this message is in the strength footer

		expect(labelElement,).toBeInTheDocument();
		expect(placeholderElement,).toBeInTheDocument();
		expect(iconElement,).toBeInTheDocument();
		expect(strengthFooterElement,).toBeNull();
		expect(errorMessage,).toBeNull();
	},);

	// Add more test cases as needed...
},);
