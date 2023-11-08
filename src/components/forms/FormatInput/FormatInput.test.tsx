/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Disable any type error for the 'param' parameter
import { render, fireEvent, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { FormatInput } from "./FormatInput"; // Adjust the import path to where your component is

// Create a custom wrapper component that includes the form context
const Wrapper = ({ children }: any) => {
	const methods = useForm();
	return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("FormatInput component", () => {
	// Helper function to render the component within the Wrapper
	const renderComponent = (props: any) =>
		render(
			<Wrapper>
				<FormatInput {...props} />
			</Wrapper>
		);

	it("renders without crashing", () => {
		renderComponent({ name: "testInput", format: "money" });
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	// ... other tests

	it("displays formatted value according to format prop", () => {
		renderComponent({ name: "testInput", format: "percentage" });
		const input: HTMLInputElement = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "0.85" } });
		fireEvent.blur(input);
		expect(input?.value).toBe("0.85%"); // assuming formatValue formats percentage this way
	});

	// ... more tests
});
