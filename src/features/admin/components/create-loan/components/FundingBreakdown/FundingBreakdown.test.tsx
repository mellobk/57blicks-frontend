import "@testing-library/jest-dom";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fireEvent, render, screen } from "@testing-library/react";
import { LoanSchema } from "@/features/admin/components/create-loan/schemas/LoanSchema";
import type { Loan } from "@/features/admin/components/create-loan/types/fields";
import { LENDERS } from "@/features/admin/components/create-loan/utils/selects";
import { defaultValues } from "@/features/admin/components/create-loan/utils/values";
import { FundingBreakdown } from "./FundingBreakdown";

interface Props {
	values?: Loan;
}

const mockSetOpenLenderModal = jest.fn();
const mockSetOpenParticipantModal = jest.fn();
const mockRemoveParticipant = jest.fn();

const WrappedFundingBreakdown: React.FC<Props> = ({ values }) => {
	const {
		control,
		formState: { errors },
	} = useForm<Loan>({
		defaultValues: values || defaultValues,
		resolver: zodResolver(LoanSchema),
	});

	return (
		<FundingBreakdown
			control={control}
			errors={errors}
			remove={mockRemoveParticipant}
			setOpenLenderModal={mockSetOpenLenderModal}
			setOpenParticipantModal={mockSetOpenParticipantModal}
		/>
	);
};

describe("FundingBreakdown", () => {
	it("renders without crashing", () => {
		render(<WrappedFundingBreakdown />);
		expect(screen.getByText("Funding Breakdown")).toBeInTheDocument();
	});

	it("renders the table with initial data", () => {
		render(<WrappedFundingBreakdown />);
		expect(screen.getByText("DKC lending LLC")).toBeInTheDocument();
		expect(screen.getByText("DKC Servicing Fee Income")).toBeInTheDocument();
		expect(screen.getByText("Yield Spread")).toBeInTheDocument();
	});

	it('enables the "Add Participant" button when conditions are met', () => {
		render(<WrappedFundingBreakdown />);
		expect(
			screen.getByTestId("funding-breakdown-add-participant")
		).not.toBeDisabled();
	});

	it('disables the "Add Participant" button when conditions are not met', () => {
		render(
			<WrappedFundingBreakdown
				values={{
					...defaultValues,
					fundingBreakdown: [
						{
							amount: "",
							investorId: LENDERS[1]?.code,
							lenderName: LENDERS[1]?.name || "Other Lender",
							prorated: "0",
							rate: "",
							regular: "0",
						},
					],
				}}
			/>
		);
		expect(
			screen.getByTestId("funding-breakdown-add-participant")
		).toBeDisabled();
	});

	it('calls setOpenParticipantModal when "Add Participant" is clicked', () => {
		render(<WrappedFundingBreakdown />);
		fireEvent.click(screen.getByTestId("funding-breakdown-add-participant"));
		expect(mockSetOpenParticipantModal).toHaveBeenCalled();
	});

	it("calls setOpenLenderModal when Lender is clicked", () => {
		render(<WrappedFundingBreakdown />);
		fireEvent.click(screen.getByTestId("funding-breakdown-select-lender"));
		expect(mockSetOpenLenderModal).toHaveBeenCalled();
	});

	it("renders prorated and regular values correctly", () => {
		render(
			<WrappedFundingBreakdown
				values={{
					...defaultValues,
					fundingBreakdown: [
						{
							lenderName: "Lender 1",
							amount: "100",
							rate: "1",
							prorated: "0",
							regular: "0",
						},
						{
							lenderName: "Lender 2",
							amount: "200",
							rate: "1",
							prorated: "0",
							regular: "0",
						},
					],
					originationDate: "2022-01-01",
				}}
			/>
		);

		expect(screen.getByText("$0.08")).toBeInTheDocument();
	});
});
