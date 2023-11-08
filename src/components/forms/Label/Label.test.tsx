import { render, screen } from "@testing-library/react";
import { Label } from "./Label"; // Adjust the import path to where your component is

describe("Label component", () => {
	it("renders a label when the label prop is provided", () => {
		render(<Label label="Test Label" />);
		expect(screen.getByText("Test Label")).toBeInTheDocument();
	});

	it("does not render when the label prop is not provided", () => {
		const { container } = render(<Label />);
		expect(container).toBeEmptyDOMElement();
	});

	it("displays an asterisk when required is true", () => {
		render(<Label label="Required Label" required />);
		expect(screen.getByText("*")).toBeInTheDocument();
	});

	// Optionally, confirm it doesn't show asterisk when required is false or not provided
	it("does not display an asterisk when required is false", () => {
		render(<Label label="Optional Label" required={false} />);
		expect(screen.queryByText("*")).not.toBeInTheDocument();
	});

	it("does not display an asterisk when required is not provided", () => {
		render(<Label label="Optional Label" />);
		expect(screen.queryByText("*")).not.toBeInTheDocument();
	});
});
