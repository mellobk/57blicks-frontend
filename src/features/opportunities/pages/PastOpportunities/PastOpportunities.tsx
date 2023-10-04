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
import { useQuery } from "@tanstack/react-query";
import OpportunitiesService from "@/features/opportunities/api/investors.ts";
import { dateFormat } from "@/utils/formats.ts";
import { IconButton } from "@/components/ui/IconButton";

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

	const opportunitiesQuery = useQuery(["opportunities-query"], () =>
		OpportunitiesService.getOpportunities()
	);

	const extractFilename = (path: string) => {
		const filename = path.split("/").pop();

		return filename || "undefined.pdf";
	};

	useEffect(() => {
		setSelectedOpportunity(opportunitiesQuery?.data?.[0]);
	}, [opportunitiesQuery?.data]);

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
					{opportunitiesQuery?.data?.map((opportunity: Opportunity) => (
						<div
							className={`${
								selectedOpportunity?.id === opportunity.id
									? "bg-gold-500/[.12]"
									: "bg-white"
							} p-4 rounded-lg cursor-pointer`}
							onClick={() => setSelectedOpportunity(opportunity)}
						>
							<Name
								filename={extractFilename(opportunity.documentS3Path)}
								selected={selectedOpportunity?.id === opportunity.id}
							/>
						</div>
					))}
				</div>

				<div className="lg:col-span-4 col-span-1 flex flex-col gap-8 py-2">
					{selectedOpportunity && (
						<>
							<div className="flex flex-row justify-between">
								<Title text="Opportunity Details" />
								<div className="flex flex-row gap-2">
									<IconButton
										bgColor="bg-green-500/[.12]"
										color="#00BA35"
										name="chart"
										width="16"
									/>
									<IconButton
										bgColor="bg-blue-200/[.12]"
										color="#0085FF"
										name="download"
										width="16"
									/>
									<IconButton
										bgColor="bg-red-500/[.12]"
										color="#FF0033"
										name="trashBin"
										width="16"
									/>
								</div>
							</div>
							<div className="flex flex-col gap-3 divide-y divide-gray-200">
								<Name
									filename={extractFilename(selectedOpportunity.documentS3Path)}
									selected
								/>
								<div>
									<Value
										label="Creation Date"
										value={dateFormat(selectedOpportunity.createdAt)}
									/>
									<Value label="ID Number" value={selectedOpportunity.id} />
								</div>
							</div>
							<div className="flex flex-col gap-3 divide-y divide-gray-200">
								<Subtitle subtitle="Reached Investors" selected />
								<Table
									className="pt-3 rounded-lg"
									columns={columns}
									data={selectedOpportunity.investorsNotifications}
								/>
							</div>
						</>
					)}
				</div>

				<div className="lg:col-span-3 col-span-1"></div>
			</div>
		</div>
	);
};
