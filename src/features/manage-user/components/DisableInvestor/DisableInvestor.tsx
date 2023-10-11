import { Button } from "@/components/ui/Button";
import { FC } from "react";

interface DeleteAdminProps {
	id?: string;
	handleDeleteUser?: (id: string) => void;
}

export const DisableInvestor: FC<DeleteAdminProps> = ({
	id = "",
	handleDeleteUser,
}) => {
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold text-red-500">disable</div> this user?
			</div>
			<Button
				className={`bg-primary-500`}
				buttonText="Disable"
				onClick={(): void => {
					if (handleDeleteUser) {
						handleDeleteUser(id);
					}
				}}
			/>
		</div>
	);
};
