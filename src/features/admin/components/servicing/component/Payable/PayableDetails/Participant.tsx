import type { FC } from "react";
import type { PayableDetail } from "../types";
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
				<>{payableDetail.investor?.user?.firstName}</>
			)}
			{type === PayableType.SERVICING && <>Servicing</>}
			{type === PayableType.YIELD_SPREAD && <>Yield Spread</>}
		</>
	);
};

export default Participant;
