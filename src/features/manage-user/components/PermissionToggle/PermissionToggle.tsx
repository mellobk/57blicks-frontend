import type { FC } from "react";
import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/ui/Toggle";

export interface PermissionToggleProps {
	permissionStatus?: boolean;
	handleOnClick?: () => void;
	handleEyesOnClick?: () => void;
	description?: string;
	permission?: string;
	name?: string;
	id?: number;
	visible?: boolean;
	keyValue?: string;
}

export const PermissionToggle: FC<PermissionToggleProps> = ({
	handleOnClick,
	permissionStatus,
	permission,
	description,
	handleEyesOnClick,
	visible,
}) => {
	return (
		<div className="flex flex-col items-center  gap-1 h-full w-full">
			<div className="flex  justify-between items-center w-full h-full">
				<div className="w-full text-[15px] font-bold">{permission}</div>{" "}
				<div className="flex  gap-2">
					<div onClick={handleEyesOnClick} className="cursor-pointer">
						<Icon name={`${visible ? "openEye" : "closeEye"}`} width="22" />
					</div>
					<Toggle
						checked={permissionStatus}
						checkedClassName="bg-green-500"
						onChecked={handleOnClick}
					/>
				</div>
			</div>
			{visible && (
				<div className="w-full text-[15px] text-gray-1000">{description}</div>
			)}
			<hr className="w-full h-[10px] mt-[10px]" />
		</div>
	);
};
