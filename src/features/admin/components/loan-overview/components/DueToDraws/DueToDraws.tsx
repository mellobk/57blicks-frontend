import type { FC } from "react";
import { Modal } from "@/components/ui/Modal";
import { Title } from "@/components/ui/Title";
import { moneyFormat } from "@/utils/formats";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type {
	ILoanOverview,
	DueToDrawDetails,
} from "@/features/admin/components/loan-overview/types/fields";

type Props = {
	data: ILoanOverview;
	openModal: boolean;
	setOpenModal: (openModal: boolean) => void;
};

const monetaryBodyTemplate = (
	rowData: DueToDrawDetails,
	field: keyof DueToDrawDetails
) => {
	return moneyFormat(rowData[field] as number);
};

export const DueToDraws: FC<Props> = ({ data, openModal, setOpenModal }) => {
	const ModalTitle = () => (
		<div className="flex flex-row gap-2.5">
			<Title text="Construction Holdback" />
			<Title
				color="text-green-500"
				text={moneyFormat(data.principleOverview.dueToDraws)}
			/>
		</div>
	);

	return (
		<Modal
			onHide={() => {
				setOpenModal(false);
			}}
			minHeight="89%"
			title={<ModalTitle />}
			visible={openModal}
			width="94%"
		>
			<DataTable
				value={data.constructionHoldbackOverview}
				className="rounded-t-lg"
			>
				<Column field="loanName" header="Loan Name" sortable />
				<Column field="loanAddress" header="Loan Address" sortable />
				<Column
					field="amountOwed"
					header="Amount Owed"
					body={(rowData: DueToDrawDetails) =>
						monetaryBodyTemplate(rowData, "amountOwed")
					}
					sortable
				/>
				<Column field="lender" header="Lender" sortable />
			</DataTable>
		</Modal>
	);
};
