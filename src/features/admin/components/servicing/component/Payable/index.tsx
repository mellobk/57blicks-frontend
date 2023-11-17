import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import Loading from "@/assets/icons/loading";
import type { Loan } from "@/features/admin/components/servicing/types/api";
import ManagePayablesService from "../../api/payable";
import PayableMonths from "./PayableMonths";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface PayableProps {
	loan: Loan;
}

const Payable: FC<PayableProps> = ({ loan }) => {
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

	const { data, isLoading, refetch } = useQuery(
		["payables-list-query"],
		() =>
			ManagePayablesService.getPayables({
				url: `by-loan/${loan.id}`,
			}),
		{ enabled: true }
	);

	const handleCurrentMonth = (): void => {
		//get current month and year if  year is 2100 then set to current year if not set to 2100  +1

		const currentMonthYear = currentMonth.getFullYear();
		if (currentMonthYear === 2100) {
			setCurrentMonth(new Date());
		} else {
			setCurrentMonth(new Date(2100, 0, 1));
		}
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center">
				<Loading />
			</div>
		);
	}

	return (
		<>
			<div
				className={`w-full flex flex-row   pb-1 pt-[6px] pl-4   gap-4 bg-gray-200 font-semibold rounded-t-xl `}
				style={{ borderBottom: "2px solid #F3F7F9" }}
			>
				<div className="w-[5%] cursor-pointer"></div>
				<div className="w-[20%] cursor-pointer">Month</div>
				<div className="w-[20%] text-right cursor-pointer">Amount</div>
				<div className="w-[20%] text-right cursor-pointer">Amount Paid</div>
				<div className="w-[15%] text-right">Status</div>
				<div className="flex flex-row   w-[15%] relative">
					<div className="w-3/4 text-right">Action</div>
					<div
						className="w-1/4 pl-2 pt-[4px]"
						onClick={(): void => {
							handleCurrentMonth();
						}}
					>
						<Icon
							name={`${
								currentMonth.getFullYear() === 2100 ? "openEye" : "closeEye"
							}`}
							width="20"
							color="#0E202F"
						/>
					</div>
				</div>
			</div>

			{data &&
				data.map((payable) => {
					//if payable moment mont is less than current month, return payable
					const payableMonth = moment(payable.month).format("YYYY-MM");
					const currentMonthCompare = moment(currentMonth).format("YYYY-MM");
					return payableMonth <= currentMonthCompare ? (
						<PayableMonths payable={payable} />
					) : null;
				})}
		</>
	);
};

export default Payable;
