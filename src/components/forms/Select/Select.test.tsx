import { render, fireEvent } from "@testing-library/react";
import { Select } from "./Select";

test("dropdown selection works", () => {
	const options = [
		{ name: "Option 1", code: "option1" },
		{ name: "Option 2", code: "option2" },
		// Add more options as needed
	];

	const { getByText } = render(<Select options={options} />);

	const selectDropdown = getByText("Select Dropdown");

	// Open the dropdown
	fireEvent.click(selectDropdown);

	// Select an option
	const optionToSelect = getByText("Option 2");
	fireEvent.click(optionToSelect);

	// Check if the selected option is rendered in the component
	expect(selectDropdown.textContent).toContain("Option 2");
});
