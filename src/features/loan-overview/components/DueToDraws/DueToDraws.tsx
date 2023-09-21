import { FC } from "react";
import { TableColumn } from "react-data-table-component";
import { Modal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";
import {
	DueToDrawDetails,
	LoanOverviewFields,
} from "@/features/loan-overview/types/fields";
import { Title } from "@/components/ui/Title/Title.tsx";
import { moneyFormat } from "@/utils/format.ts";

type Props = {
	data: LoanOverviewFields;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
};

export const DueToDraws: FC<Props> = ({ data, openModal, setOpenModal }) => {
	const columns: TableColumn<DueToDrawDetails>[] = [
		{
			name: "Loan Name",
			selector: (row) => row.loanName,
			sortable: true,
		},
		{
			name: "Loan Address",
			selector: (row) => row.loanAddress,
			sortable: true,
		},
		{
			name: "Amount Owed",
			selector: (row) => row.amountOwed,
			sortable: true,
		},
		{
			name: "Lender",
			selector: (row) => row.lender,
			sortable: true,
		},
	];

	const ModalTitle = () => (
		<div className="flex flex-row gap-2.5">
			<Title text="Due to Draws" />
			<Title color="text-green-500" text={moneyFormat(data.dueToDraws)} />
		</div>
	);

	return (
		<Modal
			onHide={() => setOpenModal(false)}
			minHeight="89%"
			title={<ModalTitle />}
			visible={openModal}
			width="94%"
		>
			<Table
				className="rounded-t-lg"
				columns={columns}
				data={data.dueToDrawDetails}
			/>
		</Modal>
	);
};
