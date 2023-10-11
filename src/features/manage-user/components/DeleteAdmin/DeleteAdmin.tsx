import { Button } from "@/components/ui/Button";
import { FC } from "react";

interface DeleteAdminProps {
	id?: string;
	handleDeleteAdmin?: (id: string) => void;
}

export const DeleteAdmin: FC<DeleteAdminProps> = ({
	id = "",
	handleDeleteAdmin,
}) => {
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold text-red-500">delete</div> this user?
			</div>
			<Button
				buttonText="Delete"
				className={`bg-primary-500`}
				onClick={(): void => {
					if (handleDeleteAdmin) {
						handleDeleteAdmin(id);
					}
				}}
			/>
		</div>
	);
};
