import { type FC, useEffect, useRef, useState } from "react";

import { Loading } from "@/components/ui/Loading";
import { Name } from "@/features/opportunities/components/PastOpportunities/Name/Name";
import { Title } from "@/components/ui/Title";
import { IconButton } from "@/components/ui/IconButton";
import { Value } from "@/features/opportunities/components/PastOpportunities/Details/Value/Value";
import { dateFormat } from "@/utils/formats";
import { Subtitle } from "@/features/opportunities/components/PastOpportunities/Subtitle/Subtitle";
import { Table } from "@/components/ui/Table";
import type { TableColumn } from "react-data-table-component";
import { useMutation } from "@tanstack/react-query";
import OpportunitiesService from "@/api/opportunities";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { Investment } from "@/types/api/investment";
import { Opportunity } from "@/types/api/opportunity";

interface Props {
	data?: Opportunity;
	getFilename: (referenceId: number) => string;
	isLoading: boolean;
}

export const Details: FC<Props> = ({ data, getFilename, isLoading }) => {
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const anchorRef = useRef<HTMLAnchorElement | null>(null);

	const deleteOpportunityMutation = useMutation((opportunityId: string) =>
		OpportunitiesService.deleteOpportunity(opportunityId)
	);

	const columns: Array<TableColumn<Investment>> = [
		{
			name: "Name",
			selector: (row) =>
				`${row.investor.user?.firstName} ${row.investor.user?.lastName}`,
			sortable: true,
		},
		{
			name: "Mailing Address",
			selector: (row) => `${row.investor.user?.email}`,
			sortable: true,
		},
		{
			cell: (row) => (
				<div className="bg-red-500/[.16] px-3 py-1.5 rounded-3xl font-inter text-[10px] text-red-500 leading-[12px] tracking-[-0.5px] font-semibold">
					{row.status}
				</div>
			),
			name: "Status",
			selector: (row) => row.status,
			sortable: true,
			width: "100px",
		},
	];

	useEffect(() => {
		if (deleteOpportunityMutation.isSuccess) {
			setOpenConfirmationModal(false);
			deleteOpportunityMutation.reset();
		}
	}, [deleteOpportunityMutation.isSuccess]);

	useEffect(() => {
		if (deleteOpportunityMutation.isError) {
			deleteOpportunityMutation.reset();
		}
	}, [deleteOpportunityMutation.isError]);

	return isLoading ? (
		<Loading />
	) : (
		data && (
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
						{data.presignedDocumentUrl && (
							<>
								<a
									className="hidden"
									href={data.presignedDocumentUrl}
									ref={anchorRef}
									target="_blank"
									download
								/>

								<IconButton
									bgColor="bg-blue-200/[.12]"
									color="#0085FF"
									name="download"
									onClick={() => anchorRef.current?.click()}
									width="16"
								/>
							</>
						)}
						<IconButton
							bgColor="bg-red-500/[.12]"
							color="#FF0033"
							name="trashBin"
							onClick={() => {
								setOpenConfirmationModal(true);
							}}
							width="16"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 divide-y divide-gray-200">
					<Name filename={getFilename(data.referenceId)} selected />
					<div>
						<Value label="Creation Date" value={dateFormat(data.createdAt)} />
						<Value label="ID Number" value={`#${data.referenceId}`} />
					</div>
				</div>
				<div className="flex flex-col gap-3 divide-y divide-gray-200">
					<Subtitle subtitle="Reached Investors" selected />
					<Table
						className="pt-3 rounded-lg"
						columns={columns}
						data={data.investments}
					/>
				</div>

				<ConfirmationModal
					action="delete"
					buttonText="Archive"
					handelConfirmation={() => {
						deleteOpportunityMutation.mutate(data.id);
					}}
					loading={deleteOpportunityMutation.isLoading}
					model="opportunity"
					onHide={() => {
						setOpenConfirmationModal(false);
					}}
					title="Delete Opportunity"
					visible={openConfirmationModal}
				/>
			</>
		)
	);
};
