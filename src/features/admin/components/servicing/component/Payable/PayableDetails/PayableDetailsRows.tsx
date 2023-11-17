import { PayableStatus, type Payable, type PayableDetail } from "../types";

import type { FC } from "react";
import { dateFormat, moneyFormat } from "@/utils/formats";
import moment from "moment";
import Chip from "@/components/ui/Chip";
import Participant from "./Participant";

interface PayableDetailsRowsProps {
	payableDetail: PayableDetail;
	payable: Payable;
}

const PayableDetailsRows: FC<PayableDetailsRowsProps> = ({
	payableDetail,
	payable,
}) => {
	const { type, typeOfPayment, debit, credit, status } = payableDetail;
	return (
		<>
			<div
				className={`w-full flex flex-row h-[40px]  pb-2 pt-[6px] pl-4   gap-4  `}
				style={{ borderBottom: "2px solid #F3F7F9" }}
			>
				<div className="w-[20%] cursor-pointer">
					<Participant type={type} payableDetail={payableDetail} />
				</div>
				<div className="w-[10%] cursor-pointer">
					{dateFormat(moment(payable.month).toISOString())}
				</div>
				<div className="w-[7%] cursor-pointer">{typeOfPayment}</div>
				<div className="w-[7%] cursor-pointer">
					{moment(payable.month).format("MMM, YYYY")}
				</div>
				<div className="w-[10%] cursor-pointer text-right">
					{moneyFormat(debit)}
				</div>
				<div className="w-[10%] cursor-pointer text-right">
					{moneyFormat(credit)}
				</div>
				<div className="w-[5%] cursor-pointer"></div>
				<div className="w-[10%] cursor-pointer">
					<Chip variant={"gray"} content={status} />
				</div>
				<div className="pb-1 w-[10%]   relative">
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
		</>
	);
};

export default PayableDetailsRows;
