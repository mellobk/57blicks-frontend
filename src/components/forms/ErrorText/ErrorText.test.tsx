import { render } from "@testing-library/react";
import { ErrorText } from "./ErrorText"; // Adjust the import path to where your component is

describe("ErrorText component", () => {
	it("does not render when there is no error", () => {
		const { container } = render(<ErrorText />);
		expect(container).toBeEmptyDOMElement();
	});

	it("displays error message when error prop is provided", () => {
		const errorMessage = "This is an error message";
		const { getByText } = render(<ErrorText error={errorMessage} />);
		expect(getByText(errorMessage)).toBeInTheDocument();
	});

	// You can add more tests if there are more conditions or variations of this component
});
