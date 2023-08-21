/* eslint-disable @typescript-eslint/no-misused-promises */

import { IconTemplate } from "@/assets/icons";

interface LoginTitleProps {
	onClose?: () => void;
}

export const ToastMfa: React.FC<LoginTitleProps> = ({ onClose }) => {
	return (
		<div className="flex  items-center  rounded-[0.75rem]   w-full bg-green-300 p-2 pl-4 pr-4 justify-between">
			<div className="text-green-500 flex gap-1 items-center ">
				  <IconTemplate name="ok" width="12" color="#00BA35"/> Code Resent!
			</div>
			<div className="text-center text-gray-1000" onClick={onClose}>{<IconTemplate name="wrong" width="10" color="#00BA35"/>}</div>
		</div>
	);
};
