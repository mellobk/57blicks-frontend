import { Button } from "@/components/ui/Button";
import type { FC } from "react";

interface DeleteAdminProps {
	handleDeleteGroup?: () => void;
	loading?: boolean;
}

export const DeletePermissionGroup: FC<DeleteAdminProps> = ({
	handleDeleteGroup,
	loading,
}) => {
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold text-red-500">delete</div> Are you sure you
				this permission set?
			</div>
			<Button
				buttonText="Delete"
				loading={loading}
				className={`bg-primary-500`}
				onClick={(): void => {
					if (handleDeleteGroup) {
						handleDeleteGroup();
					}
				}}
			/>
		</div>
	);
};
