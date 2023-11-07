import "@testing-library/jest-dom";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { defaultValues } from "@/features/admin/components/create-loan/utils/values";
import { BankingInformation } from "./BankingInformation";

const DATA_TEST_IDS = {
  bankingName: "banking-information-banking-name",
  routingNumber: "banking-information-routing-number",
  accountNumber: "banking-information-account-number",
  accountType: "banking-information-account-type",
};

const FORM_DATA = {
  bankingName: "Some Bank",
  routingNumber: 123456789,
  accountNumber: 987654321,
  accountType: "Account Type 2",
};

jest.mock("@/features/admin/components/create-loan/utils/selects", () => ({
  ACCOUNT_TYPES: [
    { code: "1", name: "Account Type 1" },
    { code: "2", name: "Account Type 2" },
  ],
  LENDERS: [
  	{ code: "1", name: "Lender A" },
  	{ code: "2", name: "Lender B" },
  ],
}));

const WrappedBankingInformation: React.FC = () => {
	const {
		control,
		formState: { errors },
		register,
	} = useForm<Loan>({
		defaultValues,
		resolver: zodResolver(LoanSchema),
	});

	return (
		<BankingInformation control={control} errors={errors} register={register} />
	);
};

describe("BankingInformation", () => {
	it("renders without crashing", () => {
		render(<WrappedBankingInformation />);
		expect(screen.getByText("Banking Information")).toBeInTheDocument();
	});

	Object.entries(DATA_TEST_IDS).forEach(([key, testId]) => {
		it(`registers ${key} input correctly`, () => {
			render(<WrappedBankingInformation />);
			expect(screen.getByTestId(testId)).toBeInTheDocument();
		});
	});

	Object.entries(FORM_DATA).forEach(([key, value]) => {
		it(`sets ${key} form value correctly`, async () => {
			render(<WrappedBankingInformation />);

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
});
