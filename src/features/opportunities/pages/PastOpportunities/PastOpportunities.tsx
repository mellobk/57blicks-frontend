import { type FC, useEffect, useState } from "react";
import { BreadCrumb } from "@/components/ui/BreadCrumb";
import { Tabs } from "@/components/ui/Tabs";
import { Title } from "@/components/ui/Title";
import { Name } from "@/features/opportunities/components/PastOpportunities/Name/Name";
import { Subtitle } from "@/features/opportunities/components/PastOpportunities/Subtitle/Subtitle";
import { Investor, Opportunity } from "@/features/opportunities/types/api";
import { tabs } from "@/features/opportunities/utils/tabs";
import { Table } from "@/components/ui/Table";
import { TableColumn } from "react-data-table-component";
import { Value } from "@/features/opportunities/components/PastOpportunities/Value/Value.tsx";

export const PastOpportunities: FC = () => {
	const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity>();
	const columns: TableColumn<Investor>[] = [
		{
			name: "Name",
			selector: (row) => `${row.user?.firstName} ${row.user?.lastName}`,
			sortable: true,
		},
		{
			name: "Mailing Address",
			selector: (row) => `${row.user?.email}`,
			sortable: true,
		},
		{
			cell: () => (
				<div className="bg-red-500/[.16] px-3 py-1.5 rounded-3xl font-inter text-[10px] text-red-500 leading-[12px] tracking-[-0.5px] font-semibold">
					Rejected
				</div>
			),
			name: "Status",
			selector: (row) => `${row.user?.firstName} ${row.user?.lastName}`,
			sortable: true,
			width: "100px",
		},
	];
	const data: Opportunity[] = [
		{
			id: "421011",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_1.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421012",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_2.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421013",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_3.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421014",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_4.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421015",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_5.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421016",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_6.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421017",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_7.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421018",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_8.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421019",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_9.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "4210120",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_10.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421021",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_11.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "421022",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_12.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
		{
			id: "4210123",
			created_at: "03-23-2020",
			filename: "DKC_Opportunity_13.pdf",
			investors: [
				{
					id: "1",
					user: {
						firstName: "Marco",
						lastName: "Ohler",
						email: "marco.ohler@revstarconsulting.com",
					},
				},
			],
		},
	];

	useEffect(() => {
		setSelectedOpportunity(data[0]);
	}, []);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="flex justify-between items-center w-full bg-primary-500 px-4 mb-2">
				<div>
					<BreadCrumb
						initialTab="Opportunities"
						actualTab="Past Opportunities"
					/>
				</div>
				<div className="relative z-10">
					<Tabs tabs={tabs} actualTab="past opportunities" />
				</div>
				<div></div>
			</div>
			<div className="grid lg:grid-cols-9 gap-6 bg-white rounded-3xl p-6 w-screen h-full overflow-y-auto">
				<div className="lg:col-span-2 col-span-1 flex flex-col gap-6 p-3 bg-gold-300 overflow-y-auto">
					{data.map((opportunity) => (
						<div
							className={`${
								selectedOpportunity?.id === opportunity.id
									? "bg-gold-500/[.12]"
									: "bg-white"
							} p-4 rounded-lg cursor-pointer`}
							onClick={() => setSelectedOpportunity(opportunity)}
						>
							<Name
								filename={opportunity.filename}
								selected={selectedOpportunity?.id === opportunity.id}
							/>
						</div>
					))}
				</div>

				<div className="lg:col-span-4 col-span-1 flex flex-col gap-8 py-2">
					{selectedOpportunity && (
						<>
							<div>
								<Title text="Opportunity Details" />
							</div>
							<div className="flex flex-col gap-3 divide-y divide-gray-200">
								<div>
									<Name filename={selectedOpportunity.filename} selected />
								</div>
								<div>
									<Value
										label="Creation Date"
										value={selectedOpportunity.created_at}
									/>
									<Value
										label="ID Number"
										value={`#${selectedOpportunity.id}`}
									/>
								</div>
							</div>
							<div className="flex flex-col gap-3 divide-y divide-gray-200">
								<div>
									<Subtitle subtitle="Reached Investors" selected />
								</div>
								<div>
									<Table
										className="mt-3 rounded-lg"
										columns={columns}
										data={selectedOpportunity.investors}
									/>
								</div>
							</div>
						</>
					)}
				</div>

				<div className="lg:col-span-3 col-span-1"></div>
			</div>
		</div>
	);
};
