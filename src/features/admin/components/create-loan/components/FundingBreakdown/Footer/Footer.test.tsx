import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { render, screen } from "@testing-library/react";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { Footer } from "./Footer";

const WrappedFooter: React.FC = () => {
	const { control } = useForm<Loan>({
		defaultValues: {
			fundingBreakdown: [
				{ amount: "100", rate: "10" },
				{ amount: "200", rate: "5" },
			],
			participationBreakdown: [
				{ amount: "200", rate: "2" },
			],
			originationDate: "10-12-2025",
			totalLoanAmount: "300",
		},
		resolver: zodResolver(LoanSchema),
	});

	return <Footer control={control} />;
};

describe("Footer", () => {
	it("renders without crashing", () => {
		render(<WrappedFooter />);
		expect(screen.getByText("Total")).toBeInTheDocument();
	});

	it("updates totals when useWatch values change", () => {
		render(<WrappedFooter />);
		expect(screen.getByText("$500.00")).toBeInTheDocument();
		expect(screen.getByText("17%")).toBeInTheDocument();
		expect(screen.getByText("$1.32")).toBeInTheDocument();
		expect(screen.getByText("$1.99")).toBeInTheDocument();
	});

	it("applies correct class based on totals and totalLoanAmount", () => {
		render(<WrappedFooter />);

		expect(screen.getByText("$500.00")).toHaveClass("text-red-ERROR");
	});
});
