import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Invoice } from "../../types";

export type InvoiceDataPdfDetails = {};

interface SendInvoiceProps {
	invoice: Invoice;
}

const SendInvoice: FC<SendInvoiceProps> = ({ invoice }) => {
	return (
		<>
			<div
				className={`absolute w-8 h-8  ${
					invoice ? "bg-green-800" : "bg-gray-150"
				}  rounded-full mr-4  align-middle  pt-[8px] pl-[12px]  cursor-pointer`}
				style={{
					left: "575px",
					top: "36px",
				}}
			>
				<Icon
					name="send"
					color={`${invoice ? "#00BA35" : "#b8bcc1"}`}
					width="12"
					height="13"
				/>
			</div>
		</>
	);
};

export default SendInvoice;
