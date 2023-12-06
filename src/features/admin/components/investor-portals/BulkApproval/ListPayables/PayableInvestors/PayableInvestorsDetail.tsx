import type { FC } from "react";
import Participant from "@/features/admin/components/servicing/component/Payable/PayableDetails/Participant";
import type { PayableDetail } from "@/features/admin/components/servicing/component/Payable/types/payable-details";
import { moneyFormat } from "@/utils/formats";

interface PayableInvestorsDetailProps {
	payableDetail: PayableDetail;
}

const PayableInvestorsDetail: FC<PayableInvestorsDetailProps> = ({
	payableDetail,
}) => {
	const { type, typeOfPayment, debit, credit } = payableDetail;
	return (
		<>
			<div
				className={`w-full flex flex-row h-[40px]  pb-2 pt-[6px] pl-4   gap-4  `}
				style={{ borderBottom: "2px solid #F3F7F9" }}
			>
				<div className="w-[20%] cursor-pointer">
					<Participant type={type} payableDetail={payableDetail} />
				</div>
				<div className="w-[7%] cursor-pointer">{typeOfPayment}</div>
				<div className="w-[10%] cursor-pointer text-right">
					{moneyFormat(debit)}
				</div>
				<div className="w-[10%] cursor-pointer text-right">
					{moneyFormat(credit)}
				</div>
				<div className="w-[5%] cursor-pointer"></div>
				<div className="w-[10%] cursor-pointer"></div>
			</div>
		</>
	);
};

export default PayableInvestorsDetail;
