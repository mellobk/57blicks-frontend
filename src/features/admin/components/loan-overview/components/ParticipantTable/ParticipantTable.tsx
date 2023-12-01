import type { FC } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import type { IParticipantOverview } from "../../types/fields";

type Props = {
	participants: Array<IParticipantOverview>;
};

export const ParticipantTable: FC<Props> = ({ participants }) => (
	<DataTable value={participants}>
		<Column field="name" header="Participant"></Column>
		<Column field="totalDrawnToDate" header="Total Drawn to Date"></Column>
		<Column field="trustUnallocated" header="Trust Unallocated"></Column>
		<Column field="trustAllocated" header="Trust Allocated"></Column>
		<Column field="dueToDraws" header="Due to Draws"></Column>
		<Column field="totalFunds" header="Total Funds"></Column>
	</DataTable>
);
