import type { FC } from "react";
import {
	FieldArrayWithId,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Column, Table } from "@/features/create-loan/components/Table/Table";
import { Title } from "@/features/create-loan/components/Title/Title";
import {
	FundingBreakdown as FundingBreakdownType,
	LoanFields,
} from "@/features/create-loan/types/fields";

interface Props {
	fields: FieldArrayWithId<LoanFields, "fundingBreakdown">[];
	setOpenLenderModal: (openLenderModal: boolean) => void;
	setOpenParticipantModal: (openParticipantModal: boolean) => void;
	register: UseFormRegister<LoanFields>;
	remove: UseFieldArrayRemove;
}

export const FundingBreakdown: FC<Props> = ({
	fields,
	setOpenLenderModal,
	setOpenParticipantModal,
	register,
	remove,
}) => {
	const columns: Column[] = [
		{
			cell: (row: FundingBreakdownType, rowIndex) => {
				if (row.type === "lender") {
					return (
						<input
							className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
							key={`${row.lender}-${rowIndex}`}
							onClick={() => setOpenLenderModal(true)}
							{...register(`fundingBreakdown.${rowIndex}.lender`)}
						/>
					);
				}

				return row.lender;
			},
			name: "Lender",
		},
		{
			cell: (row: FundingBreakdownType, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					{...register(`fundingBreakdown.${rowIndex}.amount`)}
				/>
			),
			name: "Amount",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					{...register(`fundingBreakdown.${rowIndex}.rate`)}
				/>
			),
			name: "Rate",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					value={(row.amount * row.rate) / 12}
					disabled
				/>
			),
			name: "Prorated",
			selector: (row: FundingBreakdownType): string => row.lender,
			style: { padding: 0 },
		},
		{
			name: "Regular",
			selector: (row: FundingBreakdownType): string => row.lender,
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType, rowIndex) => (
				<>
					{row.type === "participant" && (
						<Button
							className="bg-white px-0 py-2 mr-2"
							icon={<Icon name="trashBin" color="#FF0033" width="24" />}
							onClick={() => remove(rowIndex)}
							type="button"
						/>
					)}
				</>
			),
			maxWidth: "50px",
			name: "",
			style: { padding: 0 },
		},
	];
	const lender = fields.find((field) => field.type === "lender");
	const participantRows = fields.filter(
		(field) => field.type === "participant"
	);

	return (
		<div className="pt-6">
			<div className="flex flex-row justify-between">
				<Title text="Funding Breakdown" />
				<Button
					buttonText={
						<div className="ml-2 font-inter font-semibold text-sm text-primary leading-[17px] tracking-[-0.7px]">
							Add Participant
						</div>
					}
					className="rounded-2xl px-4 h-[34px] bg-gray-200"
					icon={<Icon name="plus" color="#0E2130" width="12" />}
					onClick={() => setOpenParticipantModal(true)}
					type="button"
					disabled={!(lender && participantRows.length < 4)}
				/>
			</div>
			<Table className="my-6" columns={columns} data={fields} />
		</div>
	);
};
