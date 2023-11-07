import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { defaultValues } from "@/features/admin/components/create-loan/utils/values";
import { LoanInformation } from "./LoanInformation";

const DATA_TEST_IDS = {
	loanType: "loan-information-loan-type",
	collateralAddress: "loan-information-collateral-address",
	totalLoanAmount: "loan-information-loan-amount",
	interestRate: "loan-information-interest-rate",
	originationDate: "loan-information-origin-date",
	maturityDate: "loan-information-maturity-date",
	constructionHoldback: "loan-information-construction-holdback",
	amountDrawn: "loan-information-amount-drawn",
	insuranceExpirationDate: "loan-information-insurance-expiration-date",
	prepaymentPenalty: "loan-information-prepayment-penalty",
	taxUrl: "loan-information-collateral-tax-url",
	collateralLink: "loan-information-collateral-link",
	assetType: "loan-information-asset-type",
	loanConsultant: "loan-information-loan-consultant",
	ltv: "loan-information-ltv",
	leadSource: "loan-information-lead-source",
};

const FORM_DATA = {
	loanType: "Loan Type 2",
	collateralAddress: "123 Main St",
	totalLoanAmount: 100000,
	interestRate: 5,
	originationDate: "01-01-2023",
	maturityDate: "01-01-2024",
	constructionHoldback: 20000,
	insuranceExpirationDate: "01-01-2023",
	prepaymentPenalty: "None",
	taxUrl: "https://example.com/tax",
	collateralLink: "https://example.com/collateral",
	assetType: "Asset Type 2",
	loanConsultant: "John Doe",
	ltv: 70,
	leadSource: "Lead Source 2",
};

jest.mock("@/features/admin/components/create-loan/utils/selects", () => ({
	ASSET_TYPES: [
		{ code: "1", name: "Asset Type 1" },
		{ code: "2", name: "Asset Type 2" },
	],
	LEAD_SOURCES: [
		{ code: "1", name: "Lead Source 1" },
		{ code: "2", name: "Lead Source 2" },
	],
	LENDERS: [
		{ code: "1", name: "Lender A" },
		{ code: "2", name: "Lender B" },
	],
	LOAN_TYPES: [
		{ code: "1", name: "Loan Type 1" },
		{ code: "2", name: "Loan Type 2" },
	],
}));

const WrappedLoanInformation: React.FC = () => {
	const {
		control,
		formState: { errors },
		register,
		setValue,
	} = useForm<Loan>({
		defaultValues,
		resolver: zodResolver(LoanSchema),
	});

	return (
		<LoanInformation
			control={control}
			errors={errors}
			register={register}
			setValue={setValue}
		/>
	);
};

describe("LoanInformation", () => {
	it("renders without crashing", () => {
		render(<WrappedLoanInformation />);
		expect(screen.getByText("Loan Information")).toBeInTheDocument();
	});

	Object.entries(DATA_TEST_IDS).forEach(([key, testId]) => {
		it(`registers ${key} input correctly`, () => {
			render(<WrappedLoanInformation />);
			expect(screen.getByTestId(testId)).toBeInTheDocument();
		});
	});

	Object.entries(FORM_DATA).forEach(([key, value]) => {
		it(`sets ${key} form value correctly`, async () => {
			render(<WrappedLoanInformation />);

			const testId = DATA_TEST_IDS[key as keyof typeof DATA_TEST_IDS];
			const element = screen.getByTestId(testId);

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

	it("updates amount drawn when total loan amount and construction holdback change", async () => {
		render(<WrappedLoanInformation />);

		await userEvent.type(
			screen.getByTestId(DATA_TEST_IDS.totalLoanAmount),
			"100000",
			{ delay: 1 }
		);
		await userEvent.type(
			screen.getByTestId(DATA_TEST_IDS.constructionHoldback),
			"20000",
			{ delay: 1 }
		);

		await waitFor(() => {
			expect(screen.getByTestId(DATA_TEST_IDS.amountDrawn)).toHaveValue(
				"$80,000.00"
			);
		});
	});
});
