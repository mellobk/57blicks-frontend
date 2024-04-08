/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useState, type FC, useEffect } from "react";
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

export const ServicingModal: FC<Props> = ({
	data,
	openModal,
	setOpenModal,
}) => {
	const [headerTotal, setHeaderTotal] = useState<number>(0);
	const [expandedRows, setExpandedRows] = useState<
		Array<IConstructionHoldbackOverview>
	>([]);

	useEffect(() => {
		const servicingData = data.loanServicingOverview as any;
		const totalServicing = servicingData.reduce(
			(accumulator: number, dataInterest: { servicing: string }) =>
				accumulator + Number.parseFloat(dataInterest.servicing),
			0
		);
		setHeaderTotal(totalServicing);
	}, []);

	const ModalTitle = () => (
		<div className="flex flex-row gap-2.5">
			<Title text="Servicing" />
			<Title color="text-green-500" text={moneyFormat(headerTotal)} />
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

		for (const loan of data.loanServicingOverview) {
			if (loan.lender === name) {
				total += Number(loan.servicing);
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
				value={data.loanServicingOverview
					.filter((data) => data.lender)
					.sort((a, b) => {
						if (a.loanName < b.loanName) {
							return -1;
						}
						if (a.loanName > b.loanName) {
							return 1;
						}
						return 0;
					})}
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
					field="servicing"
					header="servicing"
					body={(rowData: any) => monetaryBodyTemplate(rowData, "servicing")}
					sortable
				/>
			</DataTable>
		</Modal>
	);
};
