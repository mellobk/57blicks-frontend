import type { FC } from "react";
import { useState } from "react";

import type { PermissionGroup } from "@/features/manage-user/types/api";
import { Toggle } from "@/components/ui/Toggle";
import { Icon } from "@/components/ui/Icon";

interface PermissionToggleProps {
	permissions?: Array<PermissionGroup>;
	permissionsGroups?: Array<PermissionGroup>;
	type?: string;
	permissionType?: string;
	handleToggle?: (position: number, data: PermissionGroup) => void;
	handleHeaderToggle?: (
		checked: boolean,
		permissions: Array<PermissionGroup>,
		position: number,
		permissionType: string
	) => void;
}

export const PermissionToggle: FC<PermissionToggleProps> = ({
	permissions,
	type,
	permissionType,
	permissionsGroups,
	handleToggle,
	handleHeaderToggle,
}) => {
	/* 	console.log(permissions, permissionsGroups); */
	const [showPermissions, setShowPermissions] = useState<boolean>(false);

	const FindPermissionGroup = (
		permission: string,
		permissionGroup: Array<PermissionGroup>
	): boolean => {
		return permissionGroup.some((data) => data.name === permission) || false;
	};

	return (
		<div className="h-auto w-full rounded-3xl flex flex-col items-center relative">
			<div className="w-full flex items-center gap-3 bg-gray-200">
				<div
					className="flex items-center justify-between w-[200px] py-4 px-4 cursor-pointer"
					onClick={() => {
						setShowPermissions(!showPermissions);
					}}
				>
					<div>{type}</div>
					<div>
						<Icon name="arrowDown" width="10" color="black" />
					</div>
				</div>
			</div>
			<div className="w-full h-auto">
				{showPermissions &&
					permissions?.map((dataPermission: PermissionGroup) => {
						return (
							<div className=" flex items-center gap-3 border-b border-gray-200 justify-between ">
								<div className="w-[400px] py-4 px-4">{dataPermission.name}</div>
								{permissionsGroups?.map((data: PermissionGroup, key) => {
									return (
										<div className="w-[100px] justify-center">
											{" "}
											<Toggle
												checked={FindPermissionGroup(
													dataPermission.name || "",
													data.permissions || []
												)}
												checkedClassName="bg-green-500"
												onChecked={(): void => {
													if (handleToggle) {
														handleToggle(key, dataPermission);
													}
												}}
											/>
										</div>
									);
								})}
							</div>
						);
					})}
			</div>
		</div>
	);
};
