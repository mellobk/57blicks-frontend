import type { FC } from "react";
import { useEffect } from "react";
import { Control, UseFieldArrayRemove, useWatch } from "react-hook-form";
import { TableColumn } from "react-data-table-component";
import moment from "moment";
import { Cell } from "@/components/table/Cell";
import { FormatInput } from "@/components/table/FormatInput";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Title } from "@/components/ui/Title/Title";
import { Table } from "@/components/ui/Table/Table";
import { Footer } from "@/features/create-loan/components/FundingBreakdown/Footer/Footer";
import {
	FundingBreakdown as FundingBreakdownType,
	Loan,
} from "@/features/create-loan/types/fields";
import { lenders } from "@/features/create-loan/utils/selects";

interface Props {
	control: Control<Loan>;
	setOpenLenderModal: (openLenderModal: boolean) => void;
	setOpenParticipantModal: (openParticipantModal: boolean) => void;
	remove: UseFieldArrayRemove;
}

export const FundingBreakdown: FC<Props> = ({
	control,
	setOpenLenderModal,
	setOpenParticipantModal,
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
	const participationBreakdown = useWatch({
		control,
		name: "participationBreakdown",
		defaultValue: [],
	});

	const columns: TableColumn<FundingBreakdownType>[] = [
		{
			cell: (row, rowIndex) => {
				if (rowIndex === 0) {
					return (
						<button
							className="h-full w-full py-3 px-4 bg-white hover:bg-gray-200"
							onClick={() => setOpenLenderModal(true)}
							type="button"
						>
							<div className="flex flex-row justify-between items-center">
								{row.lenderName}
								<Icon name="arrowDown" width="6" color="#656A74" />
							</div>
						</button>
					);
				}

				return <Cell className="px-4" format="text" value={row.lenderName} />;
			},
			name: "Lender",
			style: { padding: 0 },
		},
		{
			cell: (_, rowIndex) => (
				<FormatInput
					control={control}
					format="money"
					name={`${
						rowIndex > 2 ? "participationBreakdown" : "fundingBreakdown"
					}.${rowIndex}.amount`}
				/>
			),
			name: "Amount",
			style: { padding: 0 },
		},
		{
			cell: (_, rowIndex) => (
				<FormatInput
					control={control}
					format="percentage"
					name={`${
						rowIndex > 2 ? "participationBreakdown" : "fundingBreakdown"
					}.${rowIndex}.rate`}
				/>
			),
			name: "Rate",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType) => (
				<Cell
					className="px-4"
					format="money"
					value={calculateProrated(row.amount, row.rate)}
				/>
			),
			name: "Prorated",
			style: { padding: 0 },
		},
		{
			cell: (row: FundingBreakdownType) => (
				<Cell
					className="px-4"
					format="money"
					value={calculateRegular(row.amount, row.rate)}
				/>
			),
			name: "Regular",
			style: { padding: 0 },
		},
		{
			cell: (row, rowIndex) => (
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
			width: "48px",
			name: "",
			style: { padding: 0 },
			right: true,
		},
	];

	function calculateRegular(amount: string, rate: string) {
		return (Number(amount) * (Number(rate) / 100)) / 12;
	}

	function calculateProrated(amount: string, rate: string) {
		const date = originationDate
			? moment(originationDate, "MM-DD-YYYY")
			: moment();
		const lastDayOfMonth = date.clone().endOf("month");
		const daysUntilEndOfMonth = lastDayOfMonth.diff(date, "days");

		return (
			(Number(amount) * (Number(rate) / 100)) / (365 * daysUntilEndOfMonth)
		);
	}

	function canAddParticipant() {
		const lender = fundingBreakdown[0]?.lenderId === lenders[0]?.code;
		const participants = fundingBreakdown.filter(
			(field) => field.type === "participant"
		);

		return lender && participants.length < 4;
	}

	useEffect(() => {
		console.log([...fundingBreakdown, ...participationBreakdown]);
	}, [participationBreakdown]);

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
			<Table
				className="mt-6 rounded-3xl"
				columns={columns}
				data={[...fundingBreakdown, ...participationBreakdown]}
			/>
			<Footer />
		</div>
	);
};
