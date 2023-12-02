import type { FC } from "react";
import Loading from "@/assets/icons/loading";
import ManagePayablesService from "../../../servicing/api/payable";
import PayableMonth from "./PayableMonth";
import { useQuery } from "@tanstack/react-query";

const ListPayables: FC = () => {
	const { data, isLoading } = useQuery(
		["payables-list-pending"],
		() =>
			ManagePayablesService.getPayables({
				url: `pending`,
			}),
		{ enabled: true }
	);

	console.log("🚀 ~ file: index.tsx:7 ~ data:", data);

	if (isLoading) {
		return (
			<div className="flex flex-col w-full  items-center justify-items-center justify-center">
				<div>
					<Loading />
				</div>
				<div className="pt-6">loading please wait...</div>
			</div>
		);
	}

	return (
		<>{data && data.map((payable) => <PayableMonth payable={payable} />)}</>
	);
};

export default ListPayables;
