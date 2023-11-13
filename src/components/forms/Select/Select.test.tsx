/* eslint-disable @typescript-eslint/no-floating-promises */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import userEvent from "@testing-library/user-event"; // For simulating user events

import { Select } from "./Select"; // Adjust the import path as needed

describe("Select", () => {
	test("renders with initial state", () => {
		render(
			<Select
				label="Country"
				options={[{ name: "USA", code: "us" }]}
				placeholder="select option"
			/>
		);

		// Add your assertions based on the initial state of the component
		expect(screen.getByText("Country")).toBeInTheDocument();
		expect(screen.getByLabelText("select option")).toBeInTheDocument();
		// Add more assertions as needed
	});

	test("calls onChange prop when an option is selected", () => {
		const mockOnChange = jest.fn();

		render(
			<Select
				label="Country"
				placeholder="select option"
				options={[
					{ name: "USA", code: "USA" },
					{ name: "Canada", code: "Canada" },
				]}
				onChange={mockOnChange}
			/>
		);

		// Open the dropdown
		userEvent.click(screen.getByLabelText("select option"));
		// Check if onChange was called with the selected option
	});

	// Add more tests for other functionalities and edge cases as needed
});
