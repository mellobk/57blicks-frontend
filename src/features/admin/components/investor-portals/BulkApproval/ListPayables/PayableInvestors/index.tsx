import { PayableType } from "@/features/admin/components/servicing/component/Payable/types";
/* eslint-disable react-hooks/exhaustive-deps */
import type { PayableDetailPending } from "@/features/admin/components/servicing/component/Payable/types/payable-details";
import { useEffect, useState } from "react";

import type { FC } from "react";
import ListPayableDetail from "../../ListPayableDetail/ListPayableDetail";

import ManagePayablesService, {
	type PayableApproval,
} from "@/features/admin/components/servicing/api/payable";
import { Toggle } from "@/components/ui/Toggle";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/assets/icons/loading";

interface PayableInvestorsProps {
	investorPending: PayableDetailPending;
	selected: boolean;
	payableListsDetails: Array<PayableApproval>;
	handleChange: (payableListsEdit: PayableDetailPending) => void;
	removeAll: (id: string, type: PayableType) => void;
	selectAll: (payable: Array<PayableApproval>) => void;
	addPayableListsDetails: (payable: PayableApproval) => void;
	removePayableListsDetails: (payable: PayableApproval) => void;
}

const PayableInvestors: FC<PayableInvestorsProps> = ({
	investorPending,
	payableListsDetails,
	selectAll,
	removeAll,
	handleChange,
	addPayableListsDetails,
	removePayableListsDetails,
}) => {
	const [useQuerySearch] = useState(
		`payables-list-pending-details-${investorPending.id}-${investorPending.type}`
	);
	const [showDetails, setShowDetails] = useState<boolean>();

	const query = useQuery(
		[useQuerySearch],
		() =>
			ManagePayablesService.getPayablesDetailsByInvestor({
				url: `pending-investors-details`,
				id: investorPending.id,
				type: investorPending.type,
			}),
		{ enabled: false }
	);

	const handleShowDetails = () => {
		setShowDetails(!showDetails);
	};

	useEffect(() => {}, [query.data]);

	const handleRefetch = async () => {
		await query.refetch();
	};
	useEffect(() => {
		if (showDetails) {
			void handleRefetch();
		}
	}, [showDetails]);

	useEffect(() => {
		if (investorPending.selected) {
			query.data && selectAll(query.data);
		} else {
			removeAll(investorPending.id, investorPending.type);
		}
	}, [investorPending.selected]);

	return (
		<>
			<div
				className={`w-full flex flex-row h-[50px]  pb-2 pt-[6px] pl-4 overflow-y-auto  gap-4  ${
					showDetails ? "bg-gold-50 " : ""
				} `}
				style={{ borderBottom: "2px solid #F3F7F9" }}
			>
				<div
					className="w-[5%] cursor-pointer"
					onClick={(): void => {
						handleShowDetails();
					}}
				>
					<div className="cursor-pointer mt-2">
						{showDetails !== undefined && (
							<Toggle
								checked={investorPending.selected}
								checkedClassName="bg-green-500"
								onChecked={(event: { target: { checked: boolean } }): void => {
									handleChange({
										...investorPending,
										selected: event.target.checked,
									});
									setShowDetails(true);
								}}
							/>
						)}
					</div>
				</div>
				<div
					className="w-[80%] cursor-pointer"
					onClick={(): void => {
						handleShowDetails();
					}}
				>
					{investorPending.name}{" "}
					{investorPending.type === PayableType.YIELD_SPREAD
						? PayableType.YIELD_SPREAD
						: ""}
				</div>
				<div
					className="w-[20%] text-right cursor-pointer"
					onClick={(): void => {
						handleShowDetails();
					}}
				></div>

				<div className="flex pb-1 w-[15%] text-right relative">
					<div className="absolute top-0 right-0 cursor-pointer "></div>
				</div>
				<div className="pb-1 w-[15%]   relative"></div>
			</div>

			<div className="">
				{showDetails && query.isLoading && (
					<>
						<div className="flex flex-col w-full  items-center justify-items-center justify-center ">
							<div>
								<Loading />
							</div>
							<div className="pt-6">loading please wait...</div>
						</div>
					</>
				)}

				{showDetails &&
					query.data &&
					query.data.map((payable, index) => (
						<ListPayableDetail
							key={index}
							payable={payable}
							payableListsDetails={payableListsDetails}
							addPayableListsDetails={addPayableListsDetails}
							removePayableListsDetails={removePayableListsDetails}
						/>
					))}
			</div>
		</>
	);
};

export default PayableInvestors;
