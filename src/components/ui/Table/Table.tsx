import type { FC } from "react";
import DataTable, { type TableProps } from "react-data-table-component";

export interface Props extends TableProps<any> {
	className?: string;
}

export const Table: FC<Props> = ({ className, ...props }) => {
	return (
		<div className={className}>
			<DataTable {...props} />
		</div>
	);
};
