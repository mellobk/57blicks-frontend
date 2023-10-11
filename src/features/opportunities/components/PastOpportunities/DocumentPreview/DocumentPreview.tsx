import { type FC, useEffect, useState } from "react";
import { Loading } from "@/components/ui/Loading";
import { Icon } from "@/components/ui/Icon";

interface Props {
	isLoading: boolean;
	url?: string;
}

export const DocumentPreview: FC<Props> = ({ isLoading, url }) => {
	const [showPreview, setShowPreview] = useState(false);

	useEffect(() => {
		setShowPreview(false);
	}, [url]);

	return isLoading ? (
		<Loading />
	) : url ? (
		showPreview ? (
			<iframe height="100%" src={`${url}#toolbar=0`} width="100%" />
		) : (
			<div
				className="flex justify-center items-center h-full bg-gray-500/[.08]"
				onClick={() => {
					setShowPreview(true);
				}}
			>
				<Icon color="#0E2130" name="hidden" width="48" />
			</div>
		)
	) : (
		<div className="flex h-full justify-center items-center">No PDF</div>
	);
};
