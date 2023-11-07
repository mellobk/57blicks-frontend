import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OpportunitySchema } from "@/features/admin/components/opportunities/schemas/OpportunitySchema";
import type { Opportunity } from "@/features/admin/components/opportunities/types/fields";
import { defaultValues } from "@/features/admin/components/opportunities/utils/values";
import { LoanDetails } from "./LoanDetails";

const DATA_TEST_IDS = {
	assetValue: "loan-details-asset-value",
	loanAmount: "loan-details-loan-amount",
	loanToValue: "loan-details-loan-to-value",
	loanTerm: "loan-details-loan-term",
	loanType: "loan-details-loan-type",
	investmentPermanentPenalty: "loan-details-investment-permanent-penalty",
	investmentMonthlyInterestOfferedToInvestor:
		"loan-details-investment-monthly-interested-offered-to-investor",
};

const FORM_DATA = {
	assetValue: 1000000,
	loanAmount: 750000,
	loanTerm: "30 Years",
	loanType: "Loan Type 2",
	investmentPermanentPenalty: "3%",
	investmentMonthlyInterestOfferedToInvestor: 5,
};

jest.mock("@/features/admin/components/create-loan/utils/selects", () => ({
  LOAN_TYPES: [
    { code: "1", name: "Loan Type 1" },
    { code: "2", name: "Loan Type 2" },
  ],
}));

const WrappedLoanDetails: React.FC = () => {
	const {
		control,
		formState: { errors },
		register,
	} = useForm<Opportunity>({
		defaultValues,
		resolver: zodResolver(OpportunitySchema),
	});

	return <LoanDetails control={control} errors={errors} register={register} />;
};

describe("LoanDetails", () => {
	it("renders without crashing", () => {
		render(<WrappedLoanDetails />);
		expect(screen.getByText("Loan Details")).toBeInTheDocument();
	});

	Object.entries(DATA_TEST_IDS).forEach(([key, testId]) => {
		it(`registers ${key} input correctly`, () => {
			render(<WrappedLoanDetails />);
			expect(screen.getByTestId(testId)).toBeInTheDocument();
		});
	});

	Object.entries(FORM_DATA).forEach(([key, value]) => {
		it(`sets ${key} form value correctly`, async () => {
			render(<WrappedLoanDetails />);

			const testId = DATA_TEST_IDS[key as keyof typeof DATA_TEST_IDS];
			const element: HTMLInputElement = screen.getByTestId(testId);

			if (element.className.includes("p-dropdown")) {
				void userEvent.click(element);

				const option = await screen.findByText(value);
				void userEvent.click(option);

				expect(screen.getByText(value)).toBeInTheDocument();
			} else if (element.className.includes("p-inputmask")) {
				fireEvent.change(element, { target: { value } });
				expect(element).toHaveValue(value);
			} else {
				await userEvent.type(element, String(value));
				expect(element).toHaveValue(value);
			}
		});
	});
});
