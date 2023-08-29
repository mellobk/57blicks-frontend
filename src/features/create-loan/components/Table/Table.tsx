import type { FC } from "react";
import DataTable, { TableColumn, TableProps } from "react-data-table-component";

export interface Column extends TableColumn<any> {}

export interface Props extends TableProps<any> {
	className?: string;
}

export const Table: FC<Props> = ({ className, ...props }) => {
	return (
		<div className={`rounded-3xl ${className}`}>
			<DataTable {...props} />
		</div>
	);
};
