import type { FC } from "react";

import type { PermissionGroup } from "@/features/manage-user/types/api";
import { Icon } from "@/components/ui/Icon";

interface PermissionToggleProps {
	permissions?: Array<PermissionGroup>;
	permissionsGroups?: Array<PermissionGroup>;
	type?: string;
	permissionType?: string;
	handleToggle?: (position: number, data: PermissionGroup) => void;
	handleOpenDelete?: (id: string) => void;
	handleHeaderToggle?: (
		checked: boolean,
		permissions: Array<PermissionGroup>,
		position: number,
		permissionType: string
	) => void;
}

export const PermissionHeader: FC<PermissionToggleProps> = ({
	type,
	permissionsGroups,
	handleOpenDelete,
}) => {
	return (
		<div className="h-auto w-full rounded-3xl flex flex-col items-center relative">
			<div className="w-full flex items-center gap-3 bg-gray-200">
				<div className="w-[200px] py-4 px-4">{type}</div>
				{permissionsGroups?.map((permissionGroupData: PermissionGroup) => {
					return (
						<div className=" flex w-[100px] justify-center items-center gap-1">
							<div className="w-[60%] cursor-pointer">
								{permissionGroupData.name}
							</div>
							<div
								className="flex justify-center w-[40%] cursor-pointer"
								onClick={() => {
									if (handleOpenDelete) {
										handleOpenDelete(permissionGroupData.id || "");
									}
								}}
							>
								<Icon name="trashBin" color="red" width="20" />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
