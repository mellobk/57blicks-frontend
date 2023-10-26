import type { FC } from "react";
import {
	type Control,
	type FieldErrors,
	type UseFieldArrayRemove,
	useWatch,
} from "react-hook-form";
import type { TableColumn } from "react-data-table-component";
import { Cell } from "@/components/table/Cell";
import { CellInput } from "@/components/table/CellInput";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Title } from "@/components/ui/Title/Title";
import { Table } from "@/components/ui/Table/Table";
import { Footer } from "@/features/create-loan/components/FundingBreakdown/Footer/Footer";
import type {
	FundingBreakdown as FundingBreakdownType,
	Loan,
} from "@/features/create-loan/types/fields";
import { LENDERS } from "@/features/create-loan/utils/selects";
import {
	calculateProrated,
	calculateRegular,
} from "@/utils/common-funtions.ts";

interface Props {
	control: Control<Loan>;
	errors: FieldErrors<Loan>;
	remove: UseFieldArrayRemove;
	setOpenLenderModal: (openLenderModal: boolean) => void;
	setOpenParticipantModal: (openParticipantModal: boolean) => void;
}

export const FundingBreakdown: FC<Props> = ({
	control,
	errors,
	remove,
	setOpenLenderModal,
	setOpenParticipantModal,
}) => {
	const [fundingBreakdown, originationDate, participationBreakdown] = useWatch({
		control,
		name: [
			"fundingBreakdown",
			"originationDate",
			"participationBreakdown",
			"totalLoanAmount",
		],
	});

	const columns: Array<TableColumn<FundingBreakdownType>> = [
		{
			cell: (row, rowIndex) => {
				if (rowIndex === 0) {
					return (
						<button
							className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200"
							onClick={() => {
								setOpenLenderModal(true);
							}}
							type="button"
						>
							<div className="flex flex-row justify-between items-center">
								{row.lenderName}
								<Icon name="arrowDown" width="6" color="#656A74" />
							</div>
						</button>
					);
				}

				return <Cell format="text" value={row.lenderName} />;
			},
			name: "Lender",
			style: { padding: 0 },
		},
		{
			cell: (_, rowIndex) => (
				<CellInput
					control={control}
					error={
						rowIndex > 2
							? errors?.participationBreakdown?.[rowIndex - 3]?.amount?.message
							: errors?.fundingBreakdown?.[rowIndex]?.amount?.message
					}
					format="money"
					name={
						rowIndex > 2
							? `participationBreakdown.${rowIndex - 3}.amount`
							: `fundingBreakdown.${rowIndex}.amount`
					}
				/>
			),
			name: "Amount",
			style: { padding: 0 },
		},
		{
			cell: (_, rowIndex) => (
				<CellInput
					control={control}
					error={
						rowIndex > 2
							? errors?.participationBreakdown?.[rowIndex - 3]?.rate?.message
							: errors?.fundingBreakdown?.[rowIndex]?.rate?.message
					}
					format="percentage"
					name={
						rowIndex > 2
							? `participationBreakdown.${rowIndex - 3}.rate`
							: `fundingBreakdown.${rowIndex}.rate`
					}
				/>
			),
			name: "Rate",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType) => (
				<Cell
					format="money"
					value={calculateProrated(row.amount, row.rate, originationDate)}
				/>
			),
			name: "Prorated",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType) => (
				<Cell format="money" value={calculateRegular(row.amount, row.rate)} />
			),
			name: "Regular",
			style: { padding: 0 },
		},
		{
			cell: (_, rowIndex) => (
				<>
					{rowIndex > 2 && (
						<Button
							className="bg-white px-0 py-2 mr-2"
							icon={<Icon name="trashBin" color="#FF0033" width="24" />}
							onClick={() => {
								remove(rowIndex - 3);
							}}
							type="button"
						/>
					)}
				</>
			),
			name: "",
			right: true,
			style: { padding: 0 },
			width: "48px",
		},
	];

	function canAddParticipant() {
		const lender = fundingBreakdown[0]?.investorId === LENDERS[0]?.code;

		return lender && participationBreakdown.length < 4;
	}

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
					onClick={() => {
						setOpenParticipantModal(true);
					}}
					type="button"
					disabled={!canAddParticipant()}
				/>
			</div>
			<Table
				className="mt-6 rounded-3xl"
				columns={columns}
				data={[...fundingBreakdown, ...participationBreakdown]}
			/>
			<Footer control={control} />
		</div>
	);
};
