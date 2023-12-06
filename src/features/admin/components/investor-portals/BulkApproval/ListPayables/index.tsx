import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import type { FC } from "react";
import Loading from "@/assets/icons/loading";
import ManagePayablesService, {
	type BulkApprovalBody,
	type PayableApproval,
} from "../../../servicing/api/payable";
import type { PayableDetailPending } from "../../../servicing/component/Payable/types/payable-details";
import PayableInvestors from "./PayableInvestors";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { PayableType } from "../../../servicing/component/Payable/types";

import useToast from "@/hooks/use-toast";

interface ListPayablesProps {
	setOpenModal: (openModal: boolean) => void;
}

const ListPayables: FC<ListPayablesProps> = ({ setOpenModal }) => {
	const showToast = useToast();
	const [payableLists, setPayableLists] = useState<Array<PayableDetailPending>>(
		[]
	);

	const [payableListsDetails, setPayableListsDetails] = useState<
		Array<PayableApproval>
	>([]);

	const { data, isLoading } = useQuery(
		["payables-list-pending-investor"],
		() =>
			ManagePayablesService.getPayablesDetailsPending({
				url: `pending-investors`,
			}),
		{ enabled: true }
	);

	const bulkApprovalPayableDetail = useMutation(
		async (body: BulkApprovalBody) => {
			return ManagePayablesService.bulkApprovalPayableDetail(body);
		}
	);

	useEffect(() => {
		if (data) {
			setPayableLists(data);
		}
	}, [data]);

	useEffect(() => {}, [payableListsDetails]);

	const removeAll = (id: string, type: PayableType): void => {
		//find all  payableListsDetails.payableDetails[0].payable.id with id and type and remove
		const newPayableListsDetails = payableListsDetails.filter(
			(payableListItem) =>
				payableListItem.id !== id &&
				payableListItem.payableDetails &&
				payableListItem.payableDetails[0]?.type !== type
		);

		setPayableListsDetails(newPayableListsDetails);
	};

	const addPayableListsDetails = (payable: PayableApproval): void => {
		const newPayableListsDetails = [...payableListsDetails, payable];
		setPayableListsDetails(newPayableListsDetails);
	};

	const selectAll = (payable: Array<PayableApproval>): void => {
		const newPayableListsDetails = [...payableListsDetails, ...payable];
		setPayableListsDetails(newPayableListsDetails);
	};

	const removePayableListsDetails = (payable: PayableApproval): void => {
		const newPayableListsDetails = payableListsDetails.filter(
			(payableListItem) =>
				payableListItem.payableDetails &&
				payableListItem.payableDetails[0]?.id !==
					(payable.payableDetails && payable.payableDetails[0]?.id)
		);
		setPayableListsDetails(newPayableListsDetails);
	};
	const handleChange = (payableListsEdit: PayableDetailPending): void => {
		const newPayableLists = payableLists.map((payableList) => {
			if (
				payableList.id === payableListsEdit.id &&
				payableList.type === payableListsEdit.type
			) {
				return { ...payableList, selected: !payableList.selected };
			}
			return payableList;
		});
		setPayableLists(newPayableLists);
	};

	const handleSubmit = async (): Promise<void> => {
		if (payableListsDetails.length <= 0) {
			showToast("Please select at least one payable to approve", "error");
			return;
		}

		const body: BulkApprovalBody = {
			payableDetails: payableListsDetails.map((payable) => {
				return {
					id: (payable.payableDetails && payable.payableDetails[0]?.id) ?? "",
				};
			}),
		};

		await bulkApprovalPayableDetail.mutateAsync(body, {
			onSuccess: () => {
				showToast("Payable has been approved successfully", "success");
				setOpenModal(false);
			},
		});
	};

	if (isLoading || bulkApprovalPayableDetail.isLoading) {
		return (
			<div className="flex flex-col w-full  items-center justify-items-center justify-center ">
				<div>
					<Loading />
				</div>
				<div className="pt-6">loading please wait...</div>
			</div>
		);
	}

	return (
		<>
			<div className="w-full">
				<div className="h-[480px] overflow-y-auto border shadow-sm relative">
					{payableLists.map((payableList, index) => (
						<PayableInvestors
							key={index}
							investorPending={payableList}
							selected={payableList.selected ?? false}
							payableListsDetails={payableListsDetails}
							handleChange={handleChange}
							removeAll={removeAll}
							selectAll={selectAll}
							addPayableListsDetails={addPayableListsDetails}
							removePayableListsDetails={removePayableListsDetails}
						/>
					))}
				</div>
				<Button
					variant={"primary"}
					buttonText={"Approve"}
					className="h-10 w-full mt-2"
					onClick={handleSubmit}
					disabled={bulkApprovalPayableDetail.isLoading}
					loading={bulkApprovalPayableDetail.isLoading}
				/>
			</div>
		</>
	);
};

export default ListPayables;
