import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For extended DOM matchers
import { LoginLayout } from ".";

describe("LoginLayout component", () => {
	it("renders the logo and copyright text", () => {
		const { getByAltText, getByText } = render(<LoginLayout />);

		// Check if the logo is present
		const logoElement = getByAltText("DKC Logo");
		expect(logoElement).toBeInTheDocument();

		// Check if the copyright text is present
		const copyrightElement = getByText("All right reserved / © DKC Lending");
		expect(copyrightElement).toBeInTheDocument();
	});

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
