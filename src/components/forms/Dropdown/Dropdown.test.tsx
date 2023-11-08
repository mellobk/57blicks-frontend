/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { render, fireEvent } from "@testing-library/react";
import { Dropdown } from "./Dropdown"; // Adjust the import path to where your component is
import { useForm, FormProvider } from "react-hook-form";

// A helper component to wrap the Dropdown for testing purposes
function TestComponent({ onSubmit }) {
	const methods = useForm();
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Dropdown
					placeholder="Select Test Dropdown"
					name="testDropdown"
					label="Test Dropdown"
					control={methods.control}
					error="Error message"
					// Add any additional required props here
				/>
				<button type="submit">Submit</button>
			</form>
		</FormProvider>
	);
}

describe("Dropdown component", () => {
	test("renders with label", () => {
		const { getByText } = render(<TestComponent />);
		expect(getByText("Test Dropdown")).toBeInTheDocument();
	});

	test("shows error text when there is an error", () => {
		const errorMessage = "Error message";
		const { getByText } = render(<TestComponent />, {
			initialProps: { error: errorMessage },
		});
		expect(getByText(errorMessage)).toBeInTheDocument();
	});

	// Add more tests as needed for different props, interactions, etc.
});

// You will also need to mock the Dropdown component from 'primereact/dropdown' if it has specific behavior you want to simulate or ignore.
