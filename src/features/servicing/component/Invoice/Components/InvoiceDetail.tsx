import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";

interface InvoiceDetailProps {}
const InvoiceDetail: FC<InvoiceDetailProps> = () => {
	return (
		<div className="mb-2">
			<div className="flex justify-between border-b-[1px] border-gold-370  h-14 pt-3 mb-4 ">
				<h2 className="text-2xl">Invoice Detail</h2>
				<div className="flex flex-row pr-4 ">
					<div className="w-8 h-8 bg-green-800  rounded-full mr-4  align-middle pt-[8px] pl-[12px]  cursor-pointer">
						<Icon name="send" color="#00BA35" width="12" height="13" />
					</div>
					<div className="w-8 h-8 bg-blue-70  rounded-full mr-4  align-middle pt-[6px] pl-[8px] cursor-pointer">
						<Icon name="download" color="#0085FF" width="16" />
					</div>
					<div className="w-8 h-8 bg-gray-200 rounded-full mr-4  align-middle pt-[9px] pl-[9px]  cursor-pointer">
						<Icon name="refresh" color="#656A74" width="16" />
					</div>
				</div>
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gold-400">September_2023_Invoice</div>
				<div className="flex flex-row  right-4 bg-red-200 w-14 h-6 rounded-2xl text-[8px] align-middle place-content-center pt-[5px] text-red-500 font-bold">
					<div className=" mr-1">
						<Icon name="pdf" color="red" width="14" />
					</div>
					PDF
				</div>
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gray-400">Invoice Date </div>03-23-2020
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gray-400">Invoice Number</div> #421011{" "}
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gray-400">Invoice Month</div> September
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gray-400">Last Invoice</div> Sent 02-23-2020
			</div>
		</div>
	);
};

export default InvoiceDetail;
