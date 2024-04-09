/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { Icon } from "@/components/ui/Icon";

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

export const YieldSpreadModal: FC<Props> = ({
	data,
	openModal,
	setOpenModal,
}) => {
	const [headerTotal, setHeaderTotal] = useState<number>(0);
	const [ysData, setYsData] = useState<Array<any>>([]);
	const [openYieldSpreadModal, setOpenYieldSpreadModal] = useState(false);
	const [expandedRows, setExpandedRows] = useState<
		Array<IConstructionHoldbackOverview>
	>([]);

	useEffect(() => {
		const servicingData = data.loanServicingOverview as any;
		const totalServicing = servicingData.reduce(
			(accumulator: number, dataInterest: { yieldSpread: string }) =>
				accumulator + Number.parseFloat(dataInterest.yieldSpread),
			0
		);
		setHeaderTotal(totalServicing);
	}, []);

	const ModalTitle = () => (
		<div className="flex flex-row gap-2.5">
			<Title text="Yield Spread" />
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

	const calculateConstructionHoldbackTotal = () => {
		let total = 0;

		for (const loan of data.loanServicingOverview) {
			if (loan.lender === "DKC Lending LLC") {
				total += Number(loan.yieldSpread);
			}
		}

		return moneyFormat(total);
	};

	const calculateTotal = () => {
		let total = 0;

		for (const loan of ysData) {
			total += Number(loan.total);
		}

		return moneyFormat(total);
	};

	const footerTemplate = () => {
		return (
			<td colSpan={4}>
				<div className="flex justify-end font-bold w-full">
					Subtotal: {calculateConstructionHoldbackTotal()}
				</div>
			</td>
		);
	};

	const footerTemplateYs = () => {
		return (
			<td colSpan={4}>
				<div className="flex justify-end font-bold w-full">
					Subtotal: {calculateTotal()}
				</div>
			</td>
		);
	};

	return (
		<>
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
						.filter((data) => data.lender === "DKC Lending LLC")
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
						field="yieldSpread"
						header="Yield Spread"
						body={(rowData: any) =>
							monetaryBodyTemplate(rowData, "yieldSpread")
						}
						sortable
					/>
					<Column
						body={(rowData: any) => (
							<div
								className="cursor-pointer"
								onClick={() => {
									setOpenYieldSpreadModal(true);
									setYsData(rowData.yieldSpreadInfo);
								}}
							>
								<Icon name="arrowRight" width="15" color="black" />
							</div>
						)}
					/>
				</DataTable>
			</Modal>
			<Modal
				onHide={() => {
					setOpenYieldSpreadModal(false);
				}}
				width="80%"
				title={"Participants"}
				visible={openYieldSpreadModal}
			>
				<DataTable
					value={ysData.sort((a, b) => {
						if (a.ys < b.ys) {
							return -1;
						}
						if (a.ys > b.ys) {
							return 1;
						}
						return 0;
					})}
					className="rounded-t-lg"
					rowGroupMode="subheader"
					rowGroupHeaderTemplate={headerTemplate}
					rowGroupFooterTemplate={footerTemplateYs}
				>
					<Column
						field="YSName"
						header="YS"
						body={(rowData: any) => rowData.ys}
						sortable
					/>

					<Column
						field="total"
						header="Total"
						body={(rowData: any) => rowData.total}
						sortable
					/>
				</DataTable>
			</Modal>
		</>
	);
};
