import { dateFormat, moneyFormat } from "@/utils/formats";

import { useEffect, type FC } from "react";
import type { PayableApproval } from "../../../servicing/api/payable";
import { Toggle } from "@/components/ui/Toggle";
import moment from "moment";

interface ListPayableDetailProps {
	payable: PayableApproval;
	payableListsDetails: Array<PayableApproval>;
	addPayableListsDetails: (payable: PayableApproval) => void;
	removePayableListsDetails: (payable: PayableApproval) => void;
}
const ListPayableDetail: FC<ListPayableDetailProps> = ({
	payable,
	payableListsDetails,
	addPayableListsDetails,
	removePayableListsDetails,
}) => {
	useEffect(() => {}, [payableListsDetails]);

	return (
		<>
			{payable.payableDetails?.map((detail, index) => {
				return (
					<div key={index} className="flex flex-row w-full">
						<div className="w-[20%]">
							<Toggle
								checked={payableListsDetails.some(
									(payableListItem) =>
										payableListItem.payableDetails &&
										payableListItem.payableDetails[0]?.id === detail.id
								)}
								checkedClassName="bg-green-500"
								onChecked={(event: { target: { checked: boolean } }): void => {
									event.target.checked
										? addPayableListsDetails({
												...payable,
												selected: event.target.checked,
										  })
										: removePayableListsDetails({
												...payable,
												selected: event.target.checked,
										  });
								}}
							/>
						</div>
						<div className="w-[45%]">
							{payable?.loan?.collaterals?.map((collateral, index) => {
								return <div key={index}>{collateral.address} </div>;
							})}
						</div>
						<div className="w-[15%]">
							{dateFormat(moment(payable.month).toISOString())}
						</div>
						<div className="w-[20%] bg-gold-100 text-gold text-right pr-8 h-8">
							{moneyFormat(detail.credit)}
						</div>
					</div>
				);
			})}
		</>
	);
};

export default ListPayableDetail;
