import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";

interface LoginTitleProps {
	onClose?: () => void;
}

export const ToastMfa: FC<LoginTitleProps> = ({ onClose }) => {
	return (
		<div className="flex  items-center  rounded-[0.75rem]   w-full bg-green-300 p-2 pl-4 pr-4 justify-between">
			<div className="text-green-500 flex gap-1 items-center ">
				<Icon name="ok" width="12" color="#00BA35" /> Code Resent!
			</div>
			<div className="text-center text-gray-1000" onClick={onClose}>
				{<Icon name="wrong" width="10" color="#00BA35" />}
			</div>
		</div>
	);
};
