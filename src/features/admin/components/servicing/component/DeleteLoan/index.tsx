/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useState, type FC, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { useMutation } from "@tanstack/react-query";
import ManageLoanService from "../../api/loan";
import useToast from "@/hooks/use-toast";
//import moment from "moment";

interface DeleteLoanProps {
	loan: Loan;
	handleOnCLose?: () => void;
	handleRefreshData?: () => void;
}
export const DeleteLoan: FC<DeleteLoanProps> = ({
	loan,
	handleOnCLose,
	handleRefreshData,
}) => {
	const showToast = useToast();
	const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
	const [showDelete] = useState<boolean>(true);

	const deleteLoanMutation = useMutation((id: string) => {
		return ManageLoanService.deleteLoan(id);
	});

	const handleDeleteLoan = () => {
		setOpenConfirmation(true);
	};

	const deleteLoan = () => {
		deleteLoanMutation.mutate(loan.id as string);
	};

	useEffect(() => {
		if (deleteLoanMutation.isSuccess) {
			showToast("The loan was deleted", "success");
			handleOnCLose && handleOnCLose();
			handleRefreshData && handleRefreshData();
		}
	}, [deleteLoanMutation.isSuccess]);

	useEffect(() => {
		//if loan.originationDate is less than 30 days, then disable delete button
		//TODO: Uncomment this code when the backend is ready
		// const originationDate = moment(loan.originationDate).toDate();
		// const currentDate = new Date();
		// const daysDifference = moment(currentDate).diff(
		// 	moment(originationDate),
		// 	"days"
		// );
		// if (daysDifference > 30) {
		// 	setShowDelete(false);
		// } else {
		// 	setShowDelete(true);
		// }
	}, []);

	return (
		<>
			{showDelete && (
				<div
					onClick={(): void => {
						handleDeleteLoan();
					}}
					className="absolute  w-8 h-8 text-gray-1200 border-0 bg-gray-100 rounded-full transition duration-200  flex items-center justify-center cursor-pointer"
					style={{ right: "153px", top: "24px" }}
				>
					<Icon name="trashBin" width="14" color="#ff0033" />
				</div>
			)}

			<ConfirmationModal
				action="delete"
				buttonText="Delete"
				handelConfirmation={(): void => {
					deleteLoan();
				}}
				model="loan"
				onHide={(): void => {
					setOpenConfirmation(false);
				}}
				title="Delete Loan"
				visible={openConfirmation}
			/>
		</>
	);
};
