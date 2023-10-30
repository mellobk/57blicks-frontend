import { type FC, useRef } from "react";

import PDF from "@/assets/images/png/PDF.png";
import { IconButton } from "@/components/ui/IconButton";
import { Loading } from "@/components/ui/Loading";
import { Title } from "@/components/ui/Title";
import { Opportunity } from "@/types/api/opportunity.ts";

interface Props {
	data?: Opportunity;
	getFilename: (referenceId: number) => string;
	isLoading: boolean;
}

export const DocumentPreview: FC<Props> = ({
	data,
	getFilename,
	isLoading,
}) => {
	const anchorRef = useRef<HTMLAnchorElement | null>(null);

	return isLoading ? (
		<Loading />
	) : (
		<>
			{data && (
				<>
					<div className="flex flex-row justify-between items-center">
						<Title text={getFilename(data.referenceId)} />
						<div className="flex flex-row gap-2">
							<div className="flex flex-row gap-1 items-center h-fit bg-red-500/[.16] px-4 py-2 rounded-2xl justify-between font-inter text-[13px] text-red-500 leading-4 tracking-[-0.7px] font-semibold">
								<img height="16px" width="16px" src={PDF} alt="PDF Logo" />
								PDF
							</div>

							{data.presignedDocumentUrl && (
								<>
									<a
										className="hidden"
										href={data.presignedDocumentUrl}
										ref={anchorRef}
										target="_blank"
										download
									/>

									<IconButton
										bgColor="bg-blue-200/[.12]"
										color="#0085FF"
										name="download"
										onClick={() => anchorRef.current?.click()}
										width="16"
									/>
								</>
							)}
						</div>
					</div>
					<iframe
						height="100%"
						src={`${data.presignedDocumentUrl}#toolbar=0`}
						width="100%"
					/>
				</>
			)}
		</>
	);
};
