import type { FC } from "react";
import {
	Control,
	UseFieldArrayRemove,
	UseFormRegister,
	useWatch,
} from "react-hook-form";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Title } from "@/components/ui/Title/Title";
import { Table } from "@/components/ui/Table/Table";
import {
	FundingBreakdown as FundingBreakdownType,
	LoanFields,
} from "@/features/create-loan/types/fields";
import { lenders } from "@/features/create-loan/utils/selects";

interface Props {
	control: Control<LoanFields>;
	setOpenLenderModal: (openLenderModal: boolean) => void;
	setOpenParticipantModal: (openParticipantModal: boolean) => void;
	register: UseFormRegister<LoanFields>;
	remove: UseFieldArrayRemove;
}

export const FundingBreakdown: FC<Props> = ({
	control,
	setOpenLenderModal,
	setOpenParticipantModal,
	register,
	remove,
}) => {
	const fundingBreakdown = useWatch({
		control,
		name: "fundingBreakdown",
		defaultValue: [],
	});
	const originationDate = useWatch({
		control,
		name: "originationDate",
	});
	const columns: TableColumn<FundingBreakdownType>[] = [
		{
			cell: (row: FundingBreakdownType, rowIndex) => {
				if (rowIndex === 0) {
					return (
						<button
							className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200"
							onClick={() => setOpenLenderModal(true)}
							type="button"
						>
							<div className="flex flex-row justify-between items-center">
								{row.lender}
								<Icon name="arrowDown" width="6" color="#656A74" />
							</div>
						</button>
					);
				}

				return <div className="px-4">{row.lender}</div>;
			},
			name: "Lender",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType, rowIndex) => (
				<input
					className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200 focus-visible:border-gold-500 focus-visible:border-2 focus-visible:outline-none"
					key={`${row.lender}-${rowIndex}`}
					type="number"
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
					type="number"
					{...register(`fundingBreakdown.${rowIndex}.rate`)}
				/>
			),
			name: "Rate",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType) => (
				<div className="px-4">{calculateProrated(row.amount, row.rate)}</div>
			),
			name: "Prorated",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType) => (
				<div className="px-4">{calculateRegular(row.amount, row.rate)}</div>
			),
			name: "Regular",
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
			right: true,
		},
	];

	function calculateRegular(amount = 0, rate = 0) {
		return ((amount * (rate / 100)) / 12).toFixed(2);
	}

	function calculateProrated(amount = 0, rate = 0) {
		const date = originationDate
			? moment(originationDate, "MM-DD-YYYY")
			: moment();
		const lastDayOfMonth = date.clone().endOf("month");
		const daysUntilEndOfMonth = lastDayOfMonth.diff(date, "days");

		return ((amount * (rate / 100)) / (365 * daysUntilEndOfMonth)).toFixed(2);
	}

	function canAddParticipant() {
		const lender = fundingBreakdown[0]?.lenderId === lenders[0]?.code;
		const participants = fundingBreakdown.filter(
			(field) => field.type === "participant"
		);
		return lender && participants.length < 4;
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
					onClick={() => setOpenParticipantModal(true)}
					type="button"
					disabled={!canAddParticipant()}
				/>
			</div>
			<Table className="my-6 rounded-3xl" columns={columns} data={fundingBreakdown} />
		</div>
	);
};
