import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Footer } from "./Footer";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import type React from "react";
import { defaultValues } from "@/features/admin/components/create-loan/utils/values";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
	disabled?: boolean;
}

const WrappedFooter: React.FC<Props> = ({ disabled = false }) => {
	const { control, setValue } = useForm<Loan>({
		defaultValues: defaultValues,
		resolver: zodResolver(LoanSchema),
	});

	const totals = {
		amount: 500,
		constructionHoldback: 300,
		prorated: 1.32,
		rate: 17,
		regular: 1.99,
	};

	return (
		<Footer
			disabled={disabled}
			totals={totals}
			setValue={setValue}
			control={control}
		/>
	);
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
