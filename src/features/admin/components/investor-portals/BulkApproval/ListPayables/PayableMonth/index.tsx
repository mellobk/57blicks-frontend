import { useState, type FC } from "react";
import {
	PayableStatus,
	type Payable,
} from "@/features/admin/components/servicing/component/Payable/types";
import { Icon } from "@/components/ui/Icon";
import { dateFormat, moneyFormat } from "@/utils/formats";
import moment from "moment";
import ManagePayablesService, {
	type UpdatePayableApiProps,
} from "@/features/admin/components/servicing/api/payable";
import { useMutation } from "@tanstack/react-query";
import Chip from "@/components/ui/Chip";
import PayableInvestors from "../PayableInvestors";

interface PayableMonthProps {
	payable: Payable;
}
const PayableMonth: FC<PayableMonthProps> = ({ payable }) => {
	const [showDetails, setShowDetails] = useState(false);
	const { id, month, amount, status, payableDetails } = payable;

	const approvePayable = useMutation(
		(data: UpdatePayableApiProps) => {
			return ManagePayablesService.updatePayables(data);
		},
		{
			onSuccess: () => {},
		}
	);

	const handleShowDetails = (): void => {
		setShowDetails(!showDetails);
	};

	const handleApprove = (approved: boolean): void => {
		const status: PayableStatus = approved
			? PayableStatus.PAID
			: PayableStatus.PENDING;
		const data: UpdatePayableApiProps = {
			payables: [
				{
					id,
					status,
				},
			],
		};

		approvePayable.mutate(data);
	};
	return (
		<>
			<div
				className={`w-full flex flex-row h-[40px]  pb-2 pt-[6px] pl-4   gap-4  ${
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
						<Icon name={showDetails ? `arrowOrder` : `arrowPlay`} />
					</div>
				</div>
				<div
					className="w-[20%] cursor-pointer"
					onClick={(): void => {
						handleShowDetails();
					}}
				>
					{dateFormat(moment(month).toISOString())}
				</div>
				<div
					className="w-[20%] text-right cursor-pointer"
					onClick={(): void => {
						handleShowDetails();
					}}
				>
					{moneyFormat(amount)}
				</div>

				<div className="flex pb-1 w-[15%] text-right relative">
					<div
						className="absolute top-0 right-0 cursor-pointer "
						onClick={(): void => {
							if (status === PayableStatus.PAID) handleApprove(false);
						}}
					>
						<Chip
							content={status}
							variant={status === PayableStatus.PAID ? "success" : "gray"}
						/>
					</div>
				</div>
				<div className="pb-1 w-[15%]   relative">
					<div
						className="absolute top-0 right-0 "
						onClick={(): void => {
							handleApprove(true);
						}}
					>
						{status === PayableStatus.PENDING && (
							<Chip
								content={"Approve"}
								variant={"success"}
								icon="ok"
								iconPosition="right"
								className="cursor-pointer hover:shadow-md right-0 top-0"
							/>
						)}
					</div>
				</div>
			</div>
			<div
				className={`transition-opacity ease-in-out  duration-500 ${
					showDetails ? "opacity-100" : "opacity-0"
				}`}
			>
				{showDetails && (
					<>
						{payableDetails && (
							<PayableInvestors payableDetails={payableDetails} />
						)}
					</>
				)}
			</div>
		</>
	);
};

export default PayableMonth;
