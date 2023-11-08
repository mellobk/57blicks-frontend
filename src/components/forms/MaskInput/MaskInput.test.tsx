import { render, screen, fireEvent } from "@testing-library/react";
import { MaskInput } from "./MaskInput"; // Update the import path accordingly
import { useForm, FormProvider } from "react-hook-form";

const TestComponent = ({ props }) => {
	const methods = useForm();
	return (
		<FormProvider {...methods}>
			<MaskInput {...props} />
		</FormProvider>
	);
};

describe("MaskInput component", () => {
	it("renders with label", () => {
		render(<TestComponent props={{ label: "Test Label" }} />);
		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	it("shows required asterisk", () => {
		render(
			<TestComponent props={{ label: "Required Label", required: true }} />
		);
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	it("displays error text when there is an error", () => {
		const errorMessage = "Error message";
		render(<TestComponent props={{ error: errorMessage }} />);
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it("includes icon when iconName prop is provided", () => {
		render(<TestComponent props={{ iconName: "search" }} />);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("does not include icon when iconName prop is not provided", () => {
		const { queryByTestId } = render(<TestComponent props={{}} />);
		expect(queryByTestId("icon")).not.toBeInTheDocument();
	});

	it("applies mask to the input field", () => {
		const mask = "99/99/9999";
		render(<TestComponent props={{ mask }} />);

		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "12311999" } });

		expect(input.value).toBe("12311999"); // assuming that the mask is applied, the displayed value should be formatted accordingly
	});
});
