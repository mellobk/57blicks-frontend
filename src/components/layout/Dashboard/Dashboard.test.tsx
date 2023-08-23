import { render, screen } from "@testing-library/react";
import { DashboardLayout } from "./Dashboard";

describe("DashboardLayout component", () => {
	it("renders children and copyright text", () => {
		render(
			<DashboardLayout>
				<div data-testid="child-element">Child Content</div>
			</DashboardLayout>
		);

		const childElement = screen.getByTestId("child-element");
		const copyrightText = screen.getByText(
			/All right reserved \/ © DKC Lending/
		);

		expect(childElement).toBeInTheDocument();
		expect(copyrightText).toBeInTheDocument();
	});

	it("applies proper styles to the layout container", () => {
		render(
			<DashboardLayout>
				<div>Child Content</div>
			</DashboardLayout>
		);

		const layoutContainer = screen.getByTestId("dashboard-layout-container");

		expect(layoutContainer).toHaveClass("bg-cover");
		expect(layoutContainer).toHaveClass("bg-center");
		expect(layoutContainer).toHaveClass("w-screen");
		expect(layoutContainer).toHaveClass("h-screen");
		expect(layoutContainer).toHaveClass("box-border");
		expect(layoutContainer).toHaveClass("p-6");
		expect(layoutContainer).toHaveClass("overflow-auto");
	});
});
