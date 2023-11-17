import type { FC } from "react";
import Loading from "@/assets/icons/loading";
import ManagePayablesService from "../../../api/payable";
import type { Payable } from "../types";
import PayableDetailsFooter from "./PayableDetailsFooter";
import PayableDetailsHeader from "./PayableDetailsHeader";
import PayableDetailsRows from "./PayableDetailsRows";
import { payableDetails } from "../mock/data-investor";
import { useQuery } from "@tanstack/react-query";

interface PayableDetailsProps {
	payable: Payable;
}
const PayableDetails: FC<PayableDetailsProps> = ({ payable }) => {
	const { data, isLoading } = useQuery(
		["payables-detail-list-query"],
		() =>
			ManagePayablesService.getPayablesDetails({
				url: `by-payable/${payable.id}`,
			}),
		{ enabled: true }
	);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center">
				<Loading />
			</div>
		);
	}

	return (
		<div
			data-name="parent"
			className="mt-4 mb-4 shadow-inherit rounded-md min-h-[100px] "
			style={{
				border: "1px solid #F3F7F9",
				width: "calc(100% - 4rem)",
				paddingLeft: "4rem",
			}}
		>
			<div data-name="child-1" className="">
				<PayableDetailsHeader />
				{data &&
					data.map((payableDetail) => {
						return (
							<PayableDetailsRows
								payableDetail={payableDetail}
								payable={payable}
							/>
						);
					})}
				{data && <PayableDetailsFooter payableDetail={data} />}
			</div>
		</div>
	);
};

export default PayableDetails;
