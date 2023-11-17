import type { FC } from "react";

const PayableDetailsHeader: FC = () => {
	return (
		<>
			<div
				className={`w-full flex flex-row h-[40px]  pb-2 pt-[6px] pl-4   gap-4  bg-gray-200  font-semibold rounded-t-xl`}
				style={{ borderBottom: "2px solid #F3F7F9" }}
			>
				<div className="w-[20%] ">Participant</div>
				<div className="w-[10%] ">Date</div>
				<div className="w-[7%] ">Class</div>
				<div className="w-[7%] ">Month</div>
				<div className="w-[10%] text-right">Debit</div>
				<div className="w-[10%] text-right">Credit</div>
				<div className="w-[5%] ">Rate</div>
				<div className="w-[10%] ">Status</div>
				<div className="w-[10%] ">Action</div>
			</div>
		</>
	);
};

export default PayableDetailsHeader;
