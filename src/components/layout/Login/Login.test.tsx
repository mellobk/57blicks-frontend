import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For extended DOM matchers
import { LoginLayout } from ".";

describe("LoginLayout component", () => {
	it("renders the logo and copyright text", () => {});

	it("renders children content", () => {
		const { getByTestId } = render(
			<LoginLayout>
				<div data-testid="test-child">Child Content</div>
			</LoginLayout>
		);

		// Check if the child content is present
		const childElement = getByTestId("test-child");
		expect(childElement).toBeInTheDocument();
	});
});
