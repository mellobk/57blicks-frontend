import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Invoice } from "../../types";
import ManageInvoiceService from "@/features/admin/components/servicing/api/invoices";
import { downloadFileFromUrl } from "@/utils/file/download-file-form-url";
import { useMutation } from "@tanstack/react-query";

interface DownloadInvoiceProps {
	invoice: Invoice;
}

const DownloadInvoice: FC<DownloadInvoiceProps> = ({ invoice }) => {
	const invoiceMutation = useMutation((invoiceId: string) => {
		return ManageInvoiceService.downloadInvoice(invoiceId);
	});

	const handleDownload = (): void => {
		invoiceMutation.mutate(invoice.id || "", {
			onSuccess: (data) => {
				if (data) {
					downloadFileFromUrl(data, `invoice-${invoice.id}.pdf`);
				}
			},
		});
	};
	return (
		<>
			<div
				className={`absolute w-8 h-8 ${
					invoice ? "bg-blue-70" : "bg-gray-150"
				}   rounded-full mr-4  align-middle pt-[6px] pl-[8px] cursor-pointer `}
				style={{
					right: "63px",
					top: "12px",
				}}
				onClick={(): void => {
					handleDownload();
				}}
			>
				<>
					<Icon
						name="download"
						color={`${invoice ? "#0085FF" : "#b8bcc1"}`}
						width="16"
					/>
				</>
			</div>
		</>
	);
};

export default DownloadInvoice;
