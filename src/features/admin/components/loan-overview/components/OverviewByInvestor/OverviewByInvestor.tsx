import { useState, type FC } from "react";
import { Title } from "@/components/ui/Title";
import { Footer } from "@/features/admin/components/loan-overview/components/Footer/Footer";
import type { ILenderOverview } from "../../types/fields";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ParticipantTable } from "../ParticipantTable/ParticipantTable";
import { moneyFormat } from "@/utils/formats";

type Props = {
	data: Array<ILenderOverview>;
};

export const OverviewByInvestor: FC<Props> = ({ data }) => {
	const [expandedRows, setExpandedRows] = useState<Array<ILenderOverview>>([]);

	const monetaryBodyTemplate = (
		rowData: ILenderOverview,
		field: keyof ILenderOverview
	) => {
		return moneyFormat(rowData[field] as number);
	};

	const allowExpansion = (rowData: ILenderOverview) => {
		return rowData.participants.length > 0;
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex flex-row px-8 py-6 justify-between">
				<Title text="Overview by Investors" />
			</div>

			<div className="flex flex-col h-full justify-between">
				<DataTable
					value={data}
					expandedRows={expandedRows}
					onRowToggle={(event) => {
						setExpandedRows(event.data as Array<ILenderOverview>);
					}}
					rowExpansionTemplate={(data) => {
						return <ParticipantTable participants={data.participants} />;
					}}
				>
					<Column expander={allowExpansion} style={{ width: "3em" }} />
					<Column field="name" header="Lender"></Column>
					<Column
						field="totalEquity"
						header="Total Equity"
						body={(rowData) =>
							monetaryBodyTemplate(rowData as ILenderOverview, "totalEquity")
						}
					/>
					<Column
						field="totalDrawnToDate"
						header="Total Drawn to Date"
						body={(rowData) =>
							monetaryBodyTemplate(
								rowData as ILenderOverview,
								"totalDrawnToDate"
							)
						}
					/>
					<Column
						field="trustUnallocated"
						header="Trust Unallocated"
						body={(rowData) =>
							monetaryBodyTemplate(
								rowData as ILenderOverview,
								"trustUnallocated"
							)
						}
					/>
					<Column
						field="trustAllocated"
						header="Trust Allocated"
						body={(rowData) =>
							monetaryBodyTemplate(rowData as ILenderOverview, "trustAllocated")
						}
					/>
					<Column
						field="dueToDraws"
						header="Construction Holdback"
						body={(rowData) =>
							monetaryBodyTemplate(rowData as ILenderOverview, "dueToDraws")
						}
					/>
					<Column
						field="totalFunds"
						header="Total Funds"
						body={(rowData) =>
							monetaryBodyTemplate(rowData as ILenderOverview, "totalFunds")
						}
					/>
				</DataTable>
				<Footer data={[]} />
			</div>
		</div>
	);
};
