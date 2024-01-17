/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useEffect, useRef, useState } from "react";
import type { TableColumn } from "react-data-table-component";
import { useMutation } from "@tanstack/react-query";

import OpportunitiesService from "@/api/opportunities";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { IconButton } from "@/components/ui/IconButton";
import { Loading } from "@/components/ui/Loading";
import { OpportunityName } from "@/components/ui/OpportunityName";
import { Table } from "@/components/ui/Table";
import { Title } from "@/components/ui/Title";
import { Value } from "@/features/admin/components/opportunities/components/PastOpportunities/Details/Value/Value";
import { Subtitle } from "@/features/admin/components/opportunities/components/PastOpportunities/Subtitle/Subtitle";
import type { Investment } from "@/types/api/investment";
import type { Opportunity } from "@/types/api/opportunity";
import { dateFormat } from "@/utils/formats";
import { findPermission } from "@/utils/common-functions";
import userStore from "@/stores/user-store";
import { PermissionType } from "@/types/api/permissions-type";

interface Props {
	data?: Opportunity;
	getFilename: (referenceId: number) => string;
	isLoading: boolean;
	onSuccess?: () => void;
}

export const Details: FC<Props> = ({
	data,
	getFilename,
	isLoading,
	onSuccess,
}) => {
	const userLoggedInfo = userStore((state) => state.loggedUserInfo);
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [openCloseConfirmationModal, setOpenClosConfirmationModal] =
		useState(false);
	const anchorRef = useRef<HTMLAnchorElement | null>(null);

	const deleteOpportunityMutation = useMutation((opportunityId: string) =>
		OpportunitiesService.deleteOpportunity(opportunityId)
	);

	const updateOpportunityMutation = useMutation((opportunityId: string) =>
		OpportunitiesService.putOpportunity(opportunityId, { isOpen: false })
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
				<div
					className={`${
						row.status === "ACCEPTED"
							? "bg-green-500/[.16] text-green-500"
							: "bg-red-500/[.16] text-red-500"
					} px-2 py-1.5 rounded-3xl font-inter text-[10px]  leading-[12px] tracking-[-0.5px] font-semibold`}
				>
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
		if (updateOpportunityMutation.isSuccess) {
			setOpenClosConfirmationModal(false);
			updateOpportunityMutation.reset();
			onSuccess && onSuccess();
		}
	}, [updateOpportunityMutation.isSuccess]);

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
					<div className="flex gap-2 items-center">
						<Title text="Opportunity Details" />
						<div
							className={`${
								data.isOpen
									? "bg-green-500/[.16] text-green-500"
									: "bg-red-500/[.16] text-red-500"
							} px-2 py-1.5 rounded-3xl font-inter text-[13px]  leading-[12px] tracking-[-0.5px] font-semibold`}
						>
							{data.isOpen ? "Open" : "Close"}
						</div>
					</div>
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

								{findPermission(
									userLoggedInfo?.role,
									userLoggedInfo?.permissionGroup?.permissions || [],
									PermissionType.DOWNLOAD_OPPORTUNITIES
								) && (
									<IconButton
										bgColor="bg-blue-200/[.12]"
										color="#0085FF"
										name="download"
										onClick={() => anchorRef.current?.click()}
										width="16"
									/>
								)}
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
						<IconButton
							bgColor="bg-red-500/[.12]"
							color="#FF0033"
							name="lock"
							onClick={() => {
								setOpenClosConfirmationModal(true);
							}}
							width="20"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-3 divide-y divide-gray-200">
					<OpportunityName filename={getFilename(data.referenceId)} selected />
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

				<ConfirmationModal
					action="close"
					buttonText="Close"
					handelConfirmation={() => {
						updateOpportunityMutation.mutate(data.id);
					}}
					loading={updateOpportunityMutation.isLoading}
					model="opportunity"
					onHide={() => {
						setOpenClosConfirmationModal(false);
					}}
					title="Close Opportunity"
					visible={openCloseConfirmationModal}
				/>
			</>
		)
	);
};
