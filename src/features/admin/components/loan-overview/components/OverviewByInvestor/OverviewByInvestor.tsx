import { useState, type FC } from "react";
import { Title } from "@/components/ui/Title";
import { Footer } from "@/features/admin/components/loan-overview/components/Footer/Footer";
import type { IParticipantOverview } from "../../types/fields";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ParticipantTable } from "../ParticipantTable/ParticipantTable";
import { moneyFormat } from "@/utils/formats";
import { LenderNameType } from "@/types/api/lender";

type Props = {
	data: Array<IParticipantOverview>;
};

export const OverviewByInvestor: FC<Props> = ({ data }) => {
	const [expandedRows, setExpandedRows] = useState<Array<IParticipantOverview>>(
		[]
	);

	const monetaryBodyTemplate = (
		rowData: IParticipantOverview,
		field: keyof IParticipantOverview
	) => {
		return moneyFormat(rowData[field] as number);
	};

	const allowExpansion = (rowData: IParticipantOverview) => {
		return rowData.name === LenderNameType.DKC_LENDING_LLC;
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
						setExpandedRows(event.data as Array<IParticipantOverview>);
					}}
					rowExpansionTemplate={(data) => {
						return <ParticipantTable participants={data.children} />;
					}}
				>
					<Column expander={allowExpansion} style={{ width: "3em" }} />
					<Column field="name" header="Lender"></Column>
					<Column
						field="totalLoans"
						header="Total Loans"
						body={(rowData: IParticipantOverview) =>
							monetaryBodyTemplate(rowData, "totalLoans")
						}
					/>
					<Column
						field="totalDrawnToDate"
						header="Total Drawn to Date"
						body={(rowData: IParticipantOverview) =>
							monetaryBodyTemplate(rowData, "totalDrawnToDate")
						}
					/>
					<Column
						field="trustUnallocated"
						header="Trust Unallocated"
						body={(rowData: IParticipantOverview) =>
							monetaryBodyTemplate(rowData, "trustUnallocated")
						}
					/>
					<Column
						field="trustAllocated"
						header="Trust Allocated"
						body={(rowData: IParticipantOverview) =>
							monetaryBodyTemplate(rowData, "trustAllocated")
						}
					/>
					<Column
						field="dueToDraws"
						header="Construction Holdback"
						body={(rowData: IParticipantOverview) =>
							monetaryBodyTemplate(rowData, "dueToDraws")
						}
					/>
					<Column
						field="totalFunds"
						header="Total Funds"
						body={(rowData: IParticipantOverview) =>
							monetaryBodyTemplate(rowData, "totalFunds")
						}
					/>
				</DataTable>
				<Footer data={data} />
			</div>
		</div>
	);
};
