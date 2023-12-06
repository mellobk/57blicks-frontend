/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from "react";
import { DocumentPreview } from "@/features/admin/components/opportunities/components/PastOpportunities/DocumentPreview/DocumentPreview";
import { PDFListItems } from "@/features/admin/pages/Support/components/Pdf-list-items";
import { IconButton } from "@/components/ui/IconButton";

interface Props {
	pdfList: Array<{
		name: string;
		size: string;
		upload: string;
		time: string;
		id: string;
	}>;
}

export const AttachmentsList: FC<Props> = ({ pdfList }) => {
	return (
		<div>
			<div className="h-80 lg:col-span-3 col-span-1 bg-gray-400">
				<DocumentPreview
					isLoading={false}
					url={
						"https://463225101844-files-app.s3.us-east-1.amazonaws.com/opportunities/8b4989e3-074f-42a3-aba5-cf7b4ce701bd.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAWXWS6DYKBMKKMIWY%2F20231130%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231130T153110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDSw1aEaZ56Ugo3dbENn7D6J%2B5xk8kzxk%2Bd2qF0%2F2rEEAIhAIUfQDlCvNa%2BEx7cepatlHlYA7V8NStF1BDJQ8MaMRi7KuYDCO%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNDYzMjI1MTAxODQ0IgxFjy4p3yQYenWRtjUqugOB0EgYlZsbs8VZyxEC0d056oK7sKhVNwlXLVo2i6GzXu%2FrYKw8JHuzIcI%2BP55RfKxXqot6ahGPw4lnQpo%2FUSlQZtshbcNqcdybjcJHdkBc1KZVOYTUAczbw3WChHkYoTGeSVeZphTXFV8qVCBk%2BkY0gdO67RL3cbFmhly7ZVVxCtZNHnbwp%2BSsktMnmOgaJctikXv4IxM3jGBkITPeu9RbZC51kCeoSgr1LkJM5uuZfoznzqt0nNDoQyWbjGficBtmSVcCmn56bHkpXl8b5ka8SZem5b6GeQ%2FRV7j5UN9gz%2FwOMwTbvlhE9ITS3R%2FPcrn3wnjWt5QqHpmLnOPtxesHBSfwinAlxbCQ%2Fq2csRLE%2FwEscYLd1TuKCdVB6wcV8oFrZtg7jeJF4Y54X8Lg5m4zGVmNTW83DdzZIgQPCi8%2F0C0wjbCGxtNDzXx6YIHolkWEcg03t0YeXp2Uo4S%2B94Ii0JP4HVCrpmL4knH7O%2BrjWjHo3I3xfzYu4grVBjckdHO%2BJpVDdGVydwEghN5BVDSZA7mOBdWRiU7cqtrphIPvd5YPf%2BTkSOOkKAPwsWnxryJXcYWOBjihz3otMKiroqsGOqQBMIec9kld13BFOzz21V2h5vfSLbN5NOy3tc%2FRQbNqvB8WnMhf1G5sYKxdo7cKAfCtqbMRodrpSENbdNGz81pgV14pt42TNnA8%2Bkxjfswy7sXlt60GU5TrhEPH6nJTTWVNqezxbz1wbZuQMDmtQu1t436CTue9c2vI0HAWekW1%2BUjW5Y8Tl7QhXczmQ3MsRW0mYj3R2cQOtTdH2a7jUTmfD1E%2FMYY%3D&X-Amz-Signature=550c21d81390c82098387c46e2aa74aacc971ab07d24282498b866159c6066ee&X-Amz-SignedHeaders=host&x-id=GetObject"
					}
				/>
				<div className="flex justify-center items-center bg-gray-400">
					<div>
						<IconButton
							bgColor="bg-gray-100/[.0]"
							color="#0085FF"
							name="arrowLeft"
							onClick={(): any => {
								// setOpenConfirmationModal(true);
							}}
							width="16"
						/>
					</div>
					<div>
						<span>LegalTermns.pdf</span>
					</div>
					<div>
						<IconButton
							bgColor="bg-gray-100/[.0]"
							color="#0085FF"
							name="arrowRight"
							onClick={(): any => {
								// setOpenConfirmationModal(true);
							}}
							width="16"
						/>
					</div>
				</div>
			</div>
			<div className="" style={{ paddingTop: "40px" }}>
				<PDFListItems data={pdfList} />
			</div>
		</div>
	);
};
