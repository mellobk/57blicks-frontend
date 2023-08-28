/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";
import "../../../styles/tailwind.css";

const meta: Meta<typeof Table> = {
	component: Table,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = [
	{
		name: "Title",
		selector: (row: { title: any }): any => row.title,
		sortable: true,
		omit: false,
	},
	{
		name: "Year",
		selector: (row: { year: any }): any => row.year,
		omit: false,
	},
];

const data = [
	{
		id: 1,
		title: "Beetlejuice",
		year: "1988",
	},
	{
		id: 2,
		title: "Ghostbusters",
		year: "1984",
	},
];

export const NormalTable: Story = {
	args: {
		columns: columns,
		data: data,
		buttonText: "Add admin",
		handleSearchValue: (searchValue: string): string => {
			console.log(searchValue);
			return searchValue;
		},
		children: (
			<>
				<div>1</div> <div>2</div>
			</>
		),
	},
};
