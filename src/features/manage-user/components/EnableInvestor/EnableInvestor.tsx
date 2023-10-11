import { Button } from "@/components/ui/Button";
import type { FC } from "react";

interface EnableInvestorProps {
	id?: string;
	handleDeleteUser?: (id: string) => void;
}

export const EnableInvestor: FC<EnableInvestorProps> = ({
	id = "",
	handleDeleteUser,
}) => {
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold text-green">enable</div> this user?
			</div>
			<Button
				className={`bg-primary-500`}
				buttonText="Enable"
				onClick={(): void => {
					if (handleDeleteUser) {
						handleDeleteUser(id);
					}
				}}
			/>
		</div>
	);
};
