import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

interface Props {
  disabled?: boolean;
}

const WrappedFooter: React.FC<Props> = ({ disabled = false }) => {
	const totals = {
		amount: 500,
		constructionHoldback: 300,
		prorated: 1.32,
		rate: 17,
		regular: 1.99,
	};

	return <Footer disabled={disabled} totals={totals} />;
};

describe("Footer", () => {
	it("renders without crashing", () => {
		render(<WrappedFooter />);
		expect(screen.getByText("Total")).toBeInTheDocument();
	});

	it("updates totals when useWatch values change", () => {
		render(<WrappedFooter />);
		expect(screen.getByText("$500.00")).toBeInTheDocument();
		expect(screen.getByText("--")).toBeInTheDocument();
		expect(screen.getByText("$1.32")).toBeInTheDocument();
		expect(screen.getByText("$1.99")).toBeInTheDocument();
    expect(screen.getByText("$300.00")).toBeInTheDocument();
	});

	it("applies correct class based on totals and totalLoanAmount", () => {
		render(<WrappedFooter disabled />);

		expect(screen.getByText("$500.00")).toHaveClass("text-red-ERROR");
	});
});
