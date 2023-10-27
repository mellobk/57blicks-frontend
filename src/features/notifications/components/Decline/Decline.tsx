import { Button } from "@/components/ui/Button";
import type { FC } from "react";

interface DeleteAdminProps {
	id?: string;
	handleDeleteUser?: () => void;
	text?: string;
}

export const Decline: FC<DeleteAdminProps> = ({ handleDeleteUser, text }) => {
	return (
		<div className="flex  flex-col justify-between w-full h-full gap-10 mt-9">
			<div className="flex items-center gap-2 justify-center">
				Are you sure you want to
				<div className="font-bold  text-red-500">decline</div> {text}?
			</div>
			<Button
				className={`bg-red-200 text-red-500`}
				buttonText="Decline"
				onClick={(): void => {
					if (handleDeleteUser) {
						handleDeleteUser();
					}
				}}
			/>
		</div>
	);
};
