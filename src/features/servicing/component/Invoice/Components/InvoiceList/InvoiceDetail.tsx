import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Invoice } from "../../types";
import { formatInvoiceName } from "../../utils/format-invoice-name";

interface InvoiceDetailProps {
	invoice?: Invoice;
}

const InvoiceDetail: FC<InvoiceDetailProps> = ({ invoice }) => {
	return (
		<div className="mb-2">
			<div className="flex justify-between border-b-[1px] border-gold-370  h-14 pt-3 mb-4 ">
				<h2 className="text-2xl">Invoice Detail</h2>
				<div className="flex flex-row pr-4 ">
					<div
						className={`w-8 h-8 ${
							invoice ? "bg-blue-70" : "bg-gray-150"
						}   rounded-full mr-4  align-middle pt-[6px] pl-[8px] cursor-pointer`}
					></div>
					<div
						className={`w-8 h-8 ${
							invoice ? "bg-gray-200" : "bg-gray-150"
						}  rounded-full mr-4  align-middle pt-[9px] pl-[9px]  cursor-pointer`}
					>
						<Icon
							name="refresh"
							color={`${invoice ? "#a6acb8" : "#a6acb8"}`}
							width="16"
						/>
					</div>
				</div>
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gold-400 capitalize">
					{invoice ? (
						formatInvoiceName(new Date(invoice.startDate), invoice.id || 0)
					) : (
						<></>
					)}
				</div>
				{invoice && (
					<div className="flex flex-row  right-4 bg-red-200 w-14 h-6 rounded-2xl text-[8px] align-middle place-content-center pt-[5px] text-red-500 font-bold">
						<div className=" mr-1">
							<Icon name="pdf" color="red" width="14" />
						</div>
						PDF
					</div>
				)}
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gray-400">Invoice Date</div>
				{invoice && <>{new Date(invoice.date).toDateString()}</>}
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gray-400">Invoice Number</div>
				{invoice && <>#{invoice.id}</>}
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 capitalize ">
				<div className="text-gray-400">Invoice Month</div>{" "}
				{invoice && (
					<>
						{new Date(invoice.startDate).toLocaleString("default", {
							month: "long",
						})}
					</>
				)}
			</div>
			<div className="mb-2 flex justify-between pr-8 pl-2 ">
				<div className="text-gray-400">Last Invoice</div>{" "}
				{invoice && <>{invoice.lastSent}</>}
			</div>
		</div>
	);
};

export default InvoiceDetail;
