/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, type FC } from "react";

import type { FundingBreakdown } from "../../types/api";

import DataTable from "react-data-table-component";
import { FooterTable } from "@/components/ui/FooterTabs/FooterTabs";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { TypeOfPayment } from "../TypeOfPayment/TypeOfPayment";
import { CellInput } from "@/components/table/CellInput";
import { useForm, useWatch } from "react-hook-form";
import { CellInputDate } from "@/components/table/CellInputDate";
import { formatCurrency } from "@/utils/common-funtions";

interface InvestorBankInfoProps {
	data?: FundingBreakdown;
	handleRefreshData?: () => void;
}

interface DataEntry {
	id: string;
	date?: string;
	classType?: string;
	ledgerType?: string; // This assumes you only have two possible values, "Debit" or "Credit".
	memo?: string;
	debit?: number; // Assuming currency values are stored as strings; consider using number if they are numeric.
	credit?: number; // Same assumption as above.
	balance?: number; // Same assumption as above.
}

type FormInputs = {
	date: string;
};

export const Ledger: FC<InvestorBankInfoProps> = () => {
	const { control } = useForm<FormInputs>();
	const [openClassModal, setOpenClassModal] = useState<boolean>();
	const createFooter = () => {
		const footerTabData: Array<{
			label: string;
			width: string;
			justify?: string;
		}> = [
			{ label: `total: 55`, width: "700px", justify: "center" },
			{ label: "", width: "150px" },
			{ label: "", width: "100px" },
			{ label: "", width: "200px" },
		];

		return footerTabData;
	};

	console.log(useWatch({ control }));

	const columns: any = [
		{
			cell: (row: DataEntry) => (
				<CellInputDate
					control={control}
					name={`date.${row.id}`}
					placeholder="MM-DD-YYYY"
					format="date"
				/>
			),
			name: "Date",
			sortable: true,
		},
		{
			name: "Class",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (): JSX.Element => (
				<div className="flex justify-between w-[160px] items-center">
					Type of Payment
					<div
						className="cursor-pointer"
						onClick={(): void => {
							setOpenClassModal(true);
						}}
					>
						<Icon name="pencil" width="15" color="black" />
					</div>
				</div>
			),
		},
		{
			name: "Debit/Credit",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: DataEntry): string => row.ledgerType || "",
		},
		{
			cell: (row: DataEntry) => (
				<CellInputDate
					control={control}
					name={`memo.${row.id}`}
					placeholder="Memo"
					format="text"
				/>
			),
			name: "Memo",
			maxWidth: "230px",
			minWidth: "230px",
		},
		{
			name: (
				<div className="flex gap-1">
					Debit <Icon name="debit" width="15" color="black" />
				</div>
			),
			cell: (row: DataEntry) =>
				formatCurrency(row.debit || 0) || (
					<CellInput
						control={control}
						name={`debit.${row.id}`}
						placeholder="Debit"
						format="money"
						value={row.debit}
					/>
				),
			maxWidth: "230px",
			minWidth: "230px",
		},
		{
			name: (
				<div className="flex gap-1">
					Credit <Icon name="credit" width="15" color="black" />
				</div>
			),
			cell: (row: DataEntry, rowIndex: number) =>
				formatCurrency(row.credit || 0) || (
					<CellInput
						control={control}
						name={`credit.${rowIndex}`}
						placeholder="Credit"
						format="money"
						value={row.credit}
					/>
				),
			maxWidth: "230px",
			minWidth: "230px",
		},
		{
			name: "Balance",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: DataEntry): string => formatCurrency(row.balance || 0),
		},
		{
			name: "Delete",
			maxWidth: "230px",
			minWidth: "230px",
			selector: (row: DataEntry): JSX.Element => (
				<div key={row.id}>
					<Icon name="trashBin" color="red" width="20" />
				</div>
			),
		},
	];

	const sampleData = [
		{
			id: "1",
			date: "2023-01-05",
			classType: "Geography",
			ledgerType: "Debit",
			memo: "Sample Memo 5",
			debit: 100,
			credit: 0,
			balance: 100,
		},
		{
			id: "2",
			date: "2023-01-05",
			classType: "Geography",
			ledgerType: "Debit",
			memo: "Sample Memo 5",
			debit: 100,
			credit: 0,
			balance: 100,
		},
		{
			id: "4",
			date: "2023-01-05",
			classType: "Geography",
			ledgerType: "Debit",
			memo: "Sample Memo 5",
			debit: 100,
			credit: 0,
			balance: 100,
		},
		{
			id: "5",
			date: "2023-01-05",
			classType: "Geography",
			ledgerType: "Debit",
			memo: "Sample Memo 5",
			debit: 100,
			credit: 0,
			balance: 100,
		},
		{
			id: "5",
			date: "2023-01-05",
			classType: "Geography",
			ledgerType: "Debit",
			memo: "Sample Memo 5",
			debit: 100,
			credit: 0,
			balance: 100,
		},
	];

	return (
		<div className="h-full w-full">
			<div
				className="h-full w-full rounded-3xl bg-white flex flex-col justify-between"
				style={{ overflow: "overlay" }}
			>
				<div className="rounded-3xl h-[720px] overflow-auto">
					<DataTable responsive={false} columns={columns} data={sampleData} />
				</div>
				<FooterTable tabs={createFooter()} />
			</div>

			<Modal
				visible={openClassModal}
				title="Type of Payment"
				width="700px"
				onHide={(): void => {
					setOpenClassModal(false);
				}}
			>
				<TypeOfPayment />
			</Modal>
		</div>
	);
};
