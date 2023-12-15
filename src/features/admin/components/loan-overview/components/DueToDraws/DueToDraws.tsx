import { useState, type FC } from "react";
import { Modal } from "@/components/ui/Modal";
import { Title } from "@/components/ui/Title";
import { moneyFormat } from "@/utils/formats";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import type {
	ILoanOverview,
	DueToDrawDetails,
	IConstructionHoldbackOverview,
} from "@/features/admin/components/loan-overview/types/fields";
import type { LenderNameType } from "@/types/api/lender";

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
	const [expandedRows, setExpandedRows] = useState<
		Array<IConstructionHoldbackOverview>
	>([]);

	const ModalTitle = () => (
		<div className="flex flex-row gap-2.5">
			<Title text="Construction Holdback" />
			<Title
				color="text-green-500"
				text={moneyFormat(data.principleOverview.dueToDraws)}
			/>
		</div>
	);

	const headerTemplate = (data: IConstructionHoldbackOverview) => {
		return (
			<span className="vertical-align-middle ml-2 font-bold line-height-3">
				{data.lender}
			</span>
		);
	};

	const calculateConstructionHoldbackTotal = (name: LenderNameType) => {
		let total = 0;

		for (const loan of data.constructionHoldbackOverview) {
			if (loan.lender === name) {
				total += Number(loan.amountOwed);
			}
		}

		return moneyFormat(total);
	};

	const footerTemplate = (data: IConstructionHoldbackOverview) => {
		return (
			<td colSpan={4}>
				<div className="flex justify-end font-bold w-full">
					Subtotal: {calculateConstructionHoldbackTotal(data.lender)}
				</div>
			</td>
		);
	};

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
				rowGroupMode="subheader"
				groupRowsBy="lender"
				sortOrder={1}
				sortField="lender"
				sortMode="single"
				expandableRowGroups
				expandedRows={expandedRows}
				onRowToggle={(event) => {
					setExpandedRows(event.data as Array<IConstructionHoldbackOverview>);
				}}
				rowGroupHeaderTemplate={headerTemplate}
				rowGroupFooterTemplate={footerTemplate}
			>
				<Column field="loanName" header="Loan Name" sortable />
				<Column field="loanAddress" header="Loan Address" sortable />
				<Column field="lender" header="Lender" sortable />
				<Column
					field="amountOwed"
					header="Amount Owed"
					body={(rowData: DueToDrawDetails) =>
						monetaryBodyTemplate(rowData, "amountOwed")
					}
					sortable
				/>
			</DataTable>
		</Modal>
	);
};
