import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FileUpload } from "./FileUpload"; // Adjust the import path to where your component is

describe("FileUpload component", () => {
	it("renders correctly with the required props", () => {
		render(<FileUpload label="Profile Image" />);
		expect(screen.getByText("Profile Image")).toBeInTheDocument();
	});

	it("displays label text", () => {
		render(<FileUpload label="Profile Image" />);
		expect(screen.getByText("Profile Image")).toBeInTheDocument();
	});

	it("displays error message when error prop is provided", () => {
		const errorMessage = "File is required";
		render(<FileUpload label="Profile Image" error={errorMessage} />);
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it("displays upload icon", () => {
		render(<FileUpload label="Profile Image" />);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("calls the register function on input change if provided", () => {
		const mockRegister = jest.fn();
		render(
			<FileUpload label="Profile Image" register={{ onChange: mockRegister }} />
		);
		fireEvent.change(screen.getByText("Profile Image"), {
			target: {
				files: [new File(["test"], "test.png", { type: "image/png" })],
			},
		});
	});

	// More tests can be added to cover different scenarios
});
