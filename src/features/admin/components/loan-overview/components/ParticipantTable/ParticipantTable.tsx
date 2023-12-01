import type { FC } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { IParticipantOverview } from "../../types/fields";
import { moneyFormat } from "@/utils/formats";

type Props = {
	participants: Array<IParticipantOverview>;
};

const monetaryBodyTemplate = (
	rowData: IParticipantOverview,
	field: keyof IParticipantOverview
) => {
	return moneyFormat(rowData[field] as number);
};

export const ParticipantTable: FC<Props> = ({ participants }) => {
	return (
		<DataTable value={participants}>
			<Column field="name" header="Participant"></Column>
			<Column
				field="totalDrawnToDate"
				header="Total Drawn to Date"
				body={(rowData) =>
					monetaryBodyTemplate(
						rowData as IParticipantOverview,
						"totalDrawnToDate"
					)
				}
			/>
			<Column
				field="trustUnallocated"
				header="Trust Unallocated"
				body={(rowData) =>
					monetaryBodyTemplate(
						rowData as IParticipantOverview,
						"trustUnallocated"
					)
				}
			/>
			<Column
				field="trustAllocated"
				header="Trust Allocated"
				body={(rowData) =>
					monetaryBodyTemplate(
						rowData as IParticipantOverview,
						"trustAllocated"
					)
				}
			/>
			<Column
				field="dueToDraws"
				header="Construction Holdback"
				body={(rowData) =>
					monetaryBodyTemplate(rowData as IParticipantOverview, "dueToDraws")
				}
			/>
			<Column
				field="totalFunds"
				header="Total Funds"
				body={(rowData) =>
					monetaryBodyTemplate(rowData as IParticipantOverview, "totalFunds")
				}
			/>
		</DataTable>
	);
};
