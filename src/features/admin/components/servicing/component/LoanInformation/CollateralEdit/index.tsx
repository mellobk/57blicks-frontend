/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type FC, useEffect } from "react";
import { DatePicker } from "@/components/ui/DatePicker";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";

import Loading from "@/assets/icons/loading";
import type { Loan as LoanField } from "@/types/fields/loan";
import useToast from "@/hooks/use-toast";
import type { Collateral, CollateralInsurance } from "@/types/api/collateral";
import ManageTicketService from "../../Tickets/tickets";

interface ExtendLoanProps {
	loan: Collateral;
	handleEdit?: () => void;
	submit?: boolean;
	handleRefreshData?: () => void;
}
const CollateralEdit: FC<ExtendLoanProps> = ({
	loan,
	handleEdit,
	handleRefreshData,
}) => {
	const [visible, setVisible] = useState(false);
	const notify = useToast();
	const [date, setDate] = useState<Date>();
	const { isError, isSuccess, isLoading, mutate } = useMutation(
		(data: LoanField) => {
			return ManageTicketService.updateCollateral(loan.id || "", data);
		}
	);

	useEffect(() => {
		if (date) {
			//setVisible(false);
			const data: CollateralInsurance = {
				insuranceExpirationDate: moment(date).format(
					"YYYY-MM-DD"
				) as unknown as Date,
			};
			mutate(data as any);
		}
	}, [date]);

	useEffect(() => {
		if (isSuccess) {
			handleRefreshData && handleRefreshData();
			notify("Insurance date successfully updated ", "success");
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError && handleEdit) {
			handleEdit();
		}
	}, [isError]);

	return (
		<>
			{isLoading && (
				<>
					<Loading />
				</>
			)}
			<div
				className="absolute top-2 right-2 p-2 cursor-pointer z-50"
				onClick={() => {
					setVisible(!visible);
					if (handleEdit) {
						handleEdit();
					}
				}}
			>
				<i
					className="pi pi-calendar-plus"
					style={{ color: "black", fontSize: "1.5rem" }}
				></i>
			</div>
			{visible && (
				<div className="absolute top-[24px] left-0 z-40  bg-white">
					<DatePicker
						placeholder="MM-DD-YYYY"
						minDate={moment(loan.insuranceExpirationDate).toDate()}
						name={`ledgers.month`}
						view="date"
						className="h-[50px] rounded-none [&>*]:w-full [&>*]:rounded-none [&>*]:border-gray-150  [&>*]:border-2 [&>*]:bg-gray-150 [&>*]:text-[28px] "
						dateFormat="mm-dd-yy"
						value={date ?? loan.insuranceExpirationDate}
						onChange={(date: Date): void => {
							setDate(date);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default CollateralEdit;
