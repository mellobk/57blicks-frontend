import type { FC } from "react";
import { Cell } from "@/components/table/Cell/Cell.tsx";

interface Props {}

export const Footer: FC<Props> = () => {
	return (
		<div className="flex flex-row h-10 bg-gray-200 rounded-b-2xl">
			<div className="grid grid-cols-5 gap-8 px-4 w-full items-center">
				<Cell format="text" value="Total" bold />
				<Cell format="money" value={0} bold />
				<Cell format="percentage" value={0} bold />
				<Cell format="money" value={0} bold />
				<Cell format="money" value={0} bold />
			</div>
      <div className="w-12" />
		</div>
	);
};
