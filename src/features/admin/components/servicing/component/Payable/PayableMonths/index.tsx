import { dateFormat, moneyFormat } from "@/utils/formats";

import Chip from "@/components/ui/Chip";
import { useState, type FC } from "react";
import { PayableStatus, type Payable } from "../types";
import { Icon } from "@/components/ui/Icon";
import PayableDetails from "../PayableDetails";
import moment from "moment";

interface PayableMonthsProps {
	payable: Payable;
}
const PayableMonths: FC<PayableMonthsProps> = ({ payable }) => {
	const [showDetails, setShowDetails] = useState(false);
	const { id, month, amount, amountPaid, status } = payable;

	const handleShowDetails = (): void => {
		setShowDetails(!showDetails);
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
				<div
					className="w-[20%] text-right cursor-pointer"
					onClick={(): void => {
						handleShowDetails();
					}}
				>
					{moneyFormat(amountPaid)}
				</div>
				<div className="flex pb-1 w-[15%] text-right relative">
					<div className="absolute top-0 right-0 ">
						<Chip
							content={status}
							variant={status === PayableStatus.PAID ? "gold" : "gray"}
						/>
					</div>
				</div>
				<div className="pb-1 w-[15%]   relative">
					<div className="absolute top-0 right-0 ">
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
						<PayableDetails payable={payable} />
					</>
				)}
			</div>
		</>
	);
};

export default PayableMonths;
