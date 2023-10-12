import type { FC } from "react";
import IInvoicePdfPreview from "./InvoicePdfPreview";
import InvoiceDetail from "./InvoiceDetail";
import InvoiceList from "./InvoiceList";
import InvoicePdfMiniMap from "./InvoicePdfMiniMap";

interface InvoiceScreenProps {
	loan?: string;
}
const InvoiceScreen: FC<InvoiceScreenProps> = () => {
	return (
		<>
			<div className="flex flex-row w-full rounded-3xl border-2 bg-gold-300 ">
				<div className="flex flex-row w-3/5 max-h-screen">
					<div className="w-4/6 h-full overflow-y-auto	">
						<InvoiceList />
					</div>
					<div className="w-full  bg-white h-full p-6">
						<InvoiceDetail />
					</div>
				</div>
				<div className="flex flex-row w-1/2">
					<div className="w-3/4 h-full ">
						<IInvoicePdfPreview />
					</div>
					<div className="w-1/4 h-full ">
						<InvoicePdfMiniMap />
					</div>
				</div>
			</div>
		</>
	);
};

export { InvoiceScreen };
