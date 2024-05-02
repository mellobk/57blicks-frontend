import { render, fireEvent, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import { PasswordInput } from "./PasswordInput"; // Adjust the import path accordingly

// Mocking components and utilities
jest.mock("@/components/ui/Icon", () => ({
	Icon: () => <span>Icon</span>,
}));

const Wrapper = ({ children }) => {
	const methods = useForm();
	return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("PasswordInput Component", () => {
	it("renders correctly", () => {
		render(
			<Wrapper>
				<PasswordInput label="Password" />
			</Wrapper>
		);
		expect(screen.getByText("Password")).toBeInTheDocument();
	});

	it("toggles password visibility", () => {
		render(
			<Wrapper>
				<PasswordInput label="Password" />
			</Wrapper>
		);
	});

	it("displays validation messages based on password validations", () => {
		const validations = [
			{ complete: true, message: "At least 8 characters" },
			{ complete: false, message: "Includes a number" },
		];
		render(
			<Wrapper>
				<PasswordInput label="Password" passWordValidations={validations} />
			</Wrapper>
		);
		expect(screen.getByText("At least 8 characters")).toBeInTheDocument();
		expect(screen.getByText("Includes a number")).toHaveClass(
			"font-semibold text-gray-600"
		);
	});

	it("shows an error message when there is an error", () => {
		render(
			<Wrapper>
				<PasswordInput label="Password" error="Password is required" />
			</Wrapper>
		);
		expect(screen.getByText("Password is required")).toBeInTheDocument();
	});
});
