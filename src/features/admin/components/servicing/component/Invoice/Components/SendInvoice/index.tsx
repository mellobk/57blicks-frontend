import { type FC, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Invoice, InvoiceDataPdf, InvoiceSend } from "../../types";
import { Modal } from "@/components/ui/Modal";
import { SendInvoiceTo } from "@/features/admin/components/opportunities/components/CreateOpportunity/SendInvoiceTo/SendInvoiceTo.tsx";
import { InvoiceDocumentPreview } from "../InvoiceList/InvoiceDocumentPreview.tsx";
import { BlobProvider } from "@react-pdf/renderer";
import { useMutation } from "@tanstack/react-query";
import ManageInvoiceService from "@/features/admin/components/servicing/api/invoices.ts";

interface SendInvoiceProps {
	invoice: Invoice;
	invoiceDataPdf: InvoiceDataPdf;
}

const blobToBinaryString = (blob: Blob) => {
	const reader = new FileReader();
	reader.readAsBinaryString(blob);
	return new Promise((resolve) => {
		reader.onloadend = () => {
			resolve(reader.result);
		};
	});
};

const stringToBase64 = (string: string) => {
	return btoa(string);
};

const SendInvoice: FC<SendInvoiceProps> = ({ invoice, invoiceDataPdf }) => {
	const [openModal, setOpenModal] = useState<boolean>();
	const [blob, setBlob] = useState<Blob | null>(null);

	const invoiceMutation = useMutation((data: InvoiceSend) => {
		return ManageInvoiceService.sendInvoice(data);
	});

	const handleSendInvoice = async (
		sms: boolean,
		email: boolean,
		note: string
	): Promise<void> => {
		let file: string = (await blobToBinaryString(blob as Blob)) as string;
		file = stringToBase64(file);

		const data: InvoiceSend = {
			invoiceId: invoice.id || 0,
			notification: {
				sms,
				email,
				note,
			},
			file,
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
					left: "575px",
					top: "36px",
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

			<BlobProvider
				document={<InvoiceDocumentPreview invoiceDataPdf={invoiceDataPdf} />}
			>
				{({ blob }) => {
					setBlob(blob);
					return <div></div>;
				}}
			</BlobProvider>
		</>
	);
};

export default SendInvoice;
