import { render, screen } from "@testing-library/react";
import { TextArea } from "./TextArea.tsx";

describe("TextArea component", () => {
	it("renders, placeholder, and icon when provided", () => {
		render(
			<TextArea
				label="Username"
				placeholder="Enter your username"
				iconName="search"
			/>
		);

		const labelElement = screen.getByText("Username");
		const placeholderElement = screen.getByPlaceholderText(
			"Enter your username"
		);

		expect(labelElement).toBeInTheDocument();
		expect(placeholderElement).toBeInTheDocument();
	});

	it("renders required indicator when required prop is true", () => {
		render(
			<TextArea
				label="Username"
				placeholder="Enter your username"
				required
			/>
		);

		const requiredIndicator = screen.getByText("*");
		expect(requiredIndicator).toBeInTheDocument();
	});

	it("renders error message when error is provided", () => {
		render(
			<TextArea
				label="Username"
				placeholder="Enter your username"
				error="Username is required"
			/>
		);

		const errorMessage = screen.getByText("Username is required");
		expect(errorMessage).toBeInTheDocument();
	});

	it("does not render icon when iconName is not provided", () => {
		render(<TextArea label="Username" placeholder="Enter your username" />);

		const iconElement = screen.queryByText("Mocked Icon"); // Use "queryByText" since the icon might not always be present
		expect(iconElement).toBeNull();
	});

	it("renders without error and icon when no iconName, required, or error is provided", () => {
		render(<TextArea label="Username" placeholder="Enter your username" />);

		const labelElement = screen.getByText("Username");
		const placeholderElement = screen.getByPlaceholderText(
			"Enter your username"
		);
		const iconElement = screen.queryByText("Mocked Icon"); // Use "queryByText" since the icon might not always be present
		const requiredIndicator = screen.queryByText("*"); // Use "queryByText" since the indicator might not always be present

		expect(labelElement).toBeInTheDocument();
		expect(placeholderElement).toBeInTheDocument();
		expect(iconElement).toBeNull();
		expect(requiredIndicator).toBeNull();
	});

	// Add more test cases as needed...
});
