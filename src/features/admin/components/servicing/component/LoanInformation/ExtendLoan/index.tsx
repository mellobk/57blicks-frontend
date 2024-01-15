import { useState, type FC, useEffect } from "react";
import type { Loan } from "src/features/admin/components/servicing/types/api";
import { DatePicker } from "@/components/ui/DatePicker";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import LoansService from "@/api/loans";
import Loading from "@/assets/icons/loading";
import type { Loan as LoanField } from "@/types/fields/loan";
import useToast from "@/hooks/use-toast";

interface ExtendLoanProps {
	loan: Loan;
	handleEdit: () => void;
	submit: boolean;
}
const ExtendLoan: FC<ExtendLoanProps> = ({ loan, submit, handleEdit }) => {
	const [visible, setVisible] = useState(false);
	const notify = useToast();
	const [date, setDate] = useState<Date>();
	const { isError, isSuccess, isLoading, mutate } = useMutation(
		(data: LoanField) => {
			return LoansService.extendLoan(loan.id || "", data);
		}
	);

	useEffect(() => {
		if (submit) {
			//setVisible(false);
			const data: LoanField = {
				maturityDate: moment(date).format("YYYY-MM-DD"),
			};
			mutate(data);
		}
	}, [submit]);

	useEffect(() => {
		if (isSuccess) {
			//setVisible(false);
			notify("Loan extended successfully", "success");
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isError) {
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
					handleEdit();
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
						minDate={moment(loan.maturityDate).toDate()}
						name={`ledgers.month`}
						view="date"
						className="h-[50px] rounded-none [&>*]:w-full [&>*]:rounded-none [&>*]:border-gray-150  [&>*]:border-2 [&>*]:bg-gray-150 [&>*]:text-[28px] "
						dateFormat="mm-dd-yy"
						value={date ?? loan.maturityDate}
						onChange={(date: Date): void => {
							console.log("🚀 ~ file: LedgerAdd.tsx:174 ~ date:", date);
							setDate(date);
						}}
					/>
				</div>
			)}
		</>
	);
};

export default ExtendLoan;
