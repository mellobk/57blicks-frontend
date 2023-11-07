/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type FC, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Invoice, InvoiceSend } from "../../types";
import { Modal } from "@/components/ui/Modal";
import { SendInvoiceTo } from "@/features/admin/components/opportunities/components/CreateOpportunity/SendInvoiceTo/SendInvoiceTo";
import { useMutation } from "@tanstack/react-query";
import ManageInvoiceService from "@/features/admin/components/servicing/api/invoices";

interface SendInvoiceProps {
	invoice: Invoice;
}

const SendInvoice: FC<SendInvoiceProps> = ({ invoice }) => {
	const [openModal, setOpenModal] = useState<boolean>();

	const invoiceMutation = useMutation((data: InvoiceSend) => {
		return ManageInvoiceService.sendInvoice(data);
	});

	const handleSendInvoice = (
		sms: boolean,
		email: boolean,
		note: string
	): void => {
		const data: InvoiceSend = {
			invoiceId: invoice.id || 0,
			notification: {
				sms,
				email,
				note,
			},
		};
		invoiceMutation.mutate(data, {
			onSuccess: () => {},
		});
		console.log("🚀 ~ file: index.tsx:35 ~ data:", data);
	};

	return (
		<>
			<div
				className={`absolute w-8 h-8  ${
					invoice ? "bg-green-800" : "bg-gray-150"
				}  rounded-full mr-4  align-middle  pt-[8px] pl-[12px]  cursor-pointer`}
				style={{
					right: "115px",
					top: "12px",
				}}
				onClick={(): void => {
					setOpenModal(true);
				}}
			>
				<Icon
					name="send"
					color={`${invoice ? "#00BA35" : "#b8bcc1"}`}
					width="12"
					height="13"
				/>
			</div>
			<Modal
				visible={openModal}
				title="Send Invoice"
				width="460px"
				minHeight="500px"
				className="relative"
				onHide={(): void => {
					setOpenModal(false);
				}}
			>
				<SendInvoiceTo
					setOpenModal={setOpenModal}
					handleSendInvoice={handleSendInvoice}
				/>
			</Modal>
		</>
	);
};

export default SendInvoice;
