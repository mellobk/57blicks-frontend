import type { FC } from "react";
import type { PayableDetail } from "../types/payable-details";
import { PayableType } from "../types";

interface ParticipantProps {
	type: PayableType;
	payableDetail: PayableDetail;
}
const Participant: FC<ParticipantProps> = ({ type, payableDetail }) => {
	return (
		<>
			{type === PayableType.LENDER && <>{payableDetail.lender?.name}</>}
			{type === PayableType.INVESTOR && (
				<>{`${
					payableDetail.investor?.user?.entityName ||
					`${payableDetail.investor?.user?.firstName} ${payableDetail.investor?.user?.lastName}`
				}`}</>
			)}
			{type === PayableType.SERVICING && <>Servicing</>}
			{type === PayableType.YIELD_SPREAD && (
				<>
					{`Y/S ${
						payableDetail.investor?.user?.entityName ||
						`${payableDetail.investor?.user?.firstName || ""} ${
							payableDetail.investor?.user?.lastName || ""
						}`
					}
					`}
				</>
			)}
		</>
	);
};

export default Participant;
